/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import ActivityList from "../../components/mypage/MyPage";
import { useGetProfile } from "../../hooks/user/useProfile";
import { useNavigate } from "react-router-dom";
import NameBox from "../../components/mypage/nameBox";
import Input2 from "../../components/input/Input2";
import Button from "../../components/button/Button";
import { useForm } from "react-hook-form";
import { CancelIcon, PolygonIcon } from "../../assets/CommonIcons";
import useMemberInfo from "../../hooks/user/useMemberInfo";
import { mssaemAxios as axios } from "../../apis/axios";
import { useDeleteImage } from "../../hooks/mypage/useDeleteImage";
import Catlogo from "../../assets/logo/CatLogo.svg";
import Container from "../../components/container/Container";
import Badge from "../../components/badge/Badge";
import { User } from "../../interfaces/user";

const MyPageUpdate = () => {
  const navigate = useNavigate();

  const { user } = useMemberInfo();
  const { profileData } = useGetProfile(user!!.id);
  const [mbtiNum, setMbtinum] = useState<string | null>(null);
  const [invalidInput, setInvalidInput] = useState<string | null>(null);
  const [mbti, setMbti] = useState<string | undefined>(undefined);
  const [badgeId, setBadgeId] = useState<number | null>(null);

  //초기화 및 set 하는 부분
  const [values, setValues] = useState(() => ({
    introduction: profileData?.teacherInfo.introduction,
    nickName: profileData?.teacherInfo.nickName,
    image: profileData?.teacherInfo.profileImgUrl,
    badge: profileData?.teacherInfo.badge,
  }));

  const mbtiInputs = [
    { name: "mbti_1", values: ["i", "I", "e", "E"] },
    { name: "mbti_2", values: ["s", "S", "n", "N"] },
    { name: "mbti_3", values: ["f", "F", "t", "T"] },
    { name: "mbti_4", values: ["p", "P", "j", "J"] },
  ];

  const [mbtiValue, setMbtiValue] = useState<
    { name: string; values: string[] }[]
  >(() => {
    if (profileData) {
      return mbtiInputs.map((mbti, index) => ({
        ...mbti,
        values: [profileData.teacherInfo.mbti[Number(mbti.name.charAt(5)) - 1]],
        key: index,
      }));
    }

    return mbtiInputs.map((mbti, index) => ({
      ...mbti,
      values: [""],
      key: index,
    }));
  });

  //초기값 넣는 부분
  useEffect(() => {
    getBadgeId(profileData?.teacherInfo.badge);
    if (profileData) {
      setValues((prevValues) => ({
        ...prevValues,
        introduction: profileData.teacherInfo.introduction,
        nickName: profileData.teacherInfo.nickName,
        image: profileData.teacherInfo.profileImgUrl,
        badge: profileData.teacherInfo.badge,
        badgeId: badgeId,
      }));
      setMbti(profileData.teacherInfo.mbti);
      setMbtiValue(
        mbtiInputs.map((mbti) => ({
          ...mbti,
          values: [
            profileData.teacherInfo.mbti[Number(mbti.name.charAt(5)) - 1],
          ],
        })),
      );
    }
  }, [profileData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const setIntroductionChange = (newIntroduction: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      introduction: newIntroduction,
    }));
  };

  const handleNicknameChange = (newNickname: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      nickName: newNickname,
    }));
  };

  //  --------- Submit --------------

  const data = {
    nickName: values.nickName,
    introduction: values.introduction,
    mbti: mbti,
    caseSensitivity: mbtiNum,
    badgeId: badgeId,
  };
  // 취소하기
  const handleCancel = () => {
    navigate("/");
  };

  //제출하기
  const onSubmit = async () => {
    try {
      console.log(data);
      const response = await axios.patch("/member/profile", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data == "수정 성공") {
        navigate("/profile/myprofile");
      } else {
        console.log("error 발생");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //-------- Badge ----------------------
  const selectBadge = (value: any) => {
    const isSelectedBadge = value.id === values.image;

    switch (value.type) {
      case 1:
        return badgeCSS1;
      case 2:
        return badgeCSS2;
      case 3:
        return badgeCSS3;
      case 4:
        return badgeCSS4;
      default:
        return badgeCSS1;
    }
  };

  const setBadgeChange = (newBadge: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      badge: newBadge,
    }));
  };

  const getBadgeId = (badge: string | undefined) => {
    profileData?.badgeInfos?.map(
      (value: { id: number; name: string }, idx: number) => {
        if (value.name == badge) {
          setBadgeId(value.id);
        }
      },
    );
  };

  // ------- MBTI 부분 ----------

  useEffect(() => {
    const getmbti = updateSelectedMBTI(mbtiValue);
    const mbtiNum = MBTItoNumbers(getmbti);
    const mbtiUpperValue = getmbti.toUpperCase();

    setMbtinum(mbtiNum);
    setMbti(mbtiUpperValue);

    setValues((prevValues) => ({
      ...prevValues,
    }));
  }, [mbti, mbtiNum, mbtiValue]);

  const updateSelectedMBTI = (updatedMbtiValue: typeof mbtiValue) => {
    const updatedSelectedMBTI = updatedMbtiValue
      .map((mbti) => mbti.values[0])
      .join("");

    return updatedSelectedMBTI;
  };
  const MBTItoNumbers = (mbtiString: string) => {
    const convertedString = mbtiString
      .split("")
      .map((char) => (char.toUpperCase() === char ? "1" : "0"))
      .join("");

    return convertedString;
  };

  const handlePolygonClick = (name: string) => {
    const mbtiKey = name;
    const mbtiIndex = mbtiValue.findIndex((mbti) => mbti.name === mbtiKey);
    const valuesArray = mbtiInputs.find(
      (mbti) => mbti.name === mbtiKey,
    )?.values;

    if (!valuesArray) return;

    const currentMbti = mbtiValue[mbtiIndex];
    const currentIndex = valuesArray.indexOf(currentMbti.values[0]);
    const updatedValue = valuesArray[(currentIndex + 1) % valuesArray.length];

    const updatedMbtiValues = [...mbtiValue];
    updatedMbtiValues[mbtiIndex] = { ...currentMbti, values: [updatedValue] };
    setMbtiValue(updatedMbtiValues);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const inputValue = e.target.value;

    const updatedMbtiValue = mbtiValue.map((mbti) =>
      mbti.name === name ? { ...mbti, values: [inputValue] } : mbti,
    );

    const valuesArray = mbtiInputs.find((mbti) => mbti.name === name)?.values;

    if (!valuesArray) return;

    if (!valuesArray.includes(inputValue)) {
      setInvalidInput(inputValue);
    } else {
      setInvalidInput(null);
    }
    setMbtiValue(updatedMbtiValue);
  };

  // --------  이미지 부분 ---------

  const handleImageBlobHook = async (blob: Blob) => {
    const imgUrl = URL.createObjectURL(blob);
    setImageChange(imgUrl);
    return imgUrl;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      try {
        const imgUrl = await handleImageBlobHook(file);
        const result = await uploadImage(file);
        setImageURL(result);
        setImageChange(imgUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const uploadImage = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("image", blob);
    const imgUrl = await axios.post("/member/profile/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return imgUrl.data;
  };
  const [imageURL, setImageURL] = useState<string>();
  const imageUrlToPreload = values.image;

  const setImageChange = (newImage: string | undefined) => {
    setValues((prevValues) => ({
      ...prevValues,
      image: newImage,
    }));
  };
  const deleteImageMutation = useDeleteImage();

  async function getMemberInfo(): Promise<User> {
    const { data } = await axios.get("/member/info");
    setImageChange(data.profileImgUrl);
    return data;
  }

  const handleImageCancel = async () => {
    try {
      await deleteImageMutation.mutate();
      const { profileImgUrl } = await getMemberInfo();
      setImageChange(profileImgUrl);
    } catch (error) {
      console.log(errors);
    }
  };

  return (
    <div>
      <div css={containerCSS}>
        <div css={mainTitleCSS}>프로필</div>
        <div css={boxContainerCSS}>
          <Container addCSS={box1CSS}>
            {/* box1 */}

            <div css={profileContainerCSS}>
              <div css={profileImageContainerCSS}>
                <img
                  css={imageCSS}
                  src={values.image}
                  alt="프로필"
                  decoding="async"
                />
              </div>
              <div css={cancelCSS2}>
                <CancelIcon onClick={handleImageCancel} />
              </div>
              {/* 프로필 설정  */}

              <label css={uploadLabelCSS}>
                <span css={settingCSS}>프로필 설정</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  css={uploadInputCSS}
                />
              </label>
              <div>
                <p css={subTitle2CSS}>닉네임</p>
                <NameBox
                  name={values.nickName}
                  onChange={handleNicknameChange}
                />

                {/* <MbtiBox /> */}
                <p css={subTitle2CSS}>MBTI</p>
                <div css={userinfoCSS}>
                  <div css={mbtiBox}>
                    {mbtiInputs.map((mbti, index) => (
                      <div key={mbti.name} css={mbtiContainerCSS}>
                        <input
                          type="text"
                          css={mbtiCSS}
                          value={mbtiValue[index].values[0]}
                          onChange={(e) => handleInputChange(e, mbti.name)}
                          placeholder={profileData?.teacherInfo.mbti}
                        />
                        <div css={arrowContainerCSS}>
                          <PolygonIcon
                            width={"9"}
                            height={"70"}
                            onClick={() => handlePolygonClick(mbti.name)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {invalidInput &&
                    !mbtiInputs.some((mbti) =>
                      mbti.values.includes(invalidInput),
                    ) && (
                      <div css={warningContainerCSS}>
                        <p css={warningMessageCSS}>
                          "{invalidInput}"은(는) 유효한 MBTI 요소가 아닙니다.
                        </p>
                      </div>
                    )}
                </div>
                <p css={subTitle2CSS}>한줄소개</p>
                <Input2
                  placeholder={profileData?.teacherInfo.introduction}
                  value={values.introduction}
                  onChange={(e) => setIntroductionChange(e.target.value)}
                />
              </div>
            </div>
          </Container>

          {/* box2 */}
          <Container addCSS={box2CSS}>
            <p css={subTitleCSS}>수집한 칭호</p>
            <div css={collectedTitleContainer}>
              {profileData?.badgeInfos?.map(
                (value: { id: number; name: string }, idx: number) => {
                  const isSelected = value.name === values.badge;
                  // 클릭 이벤트 핸들러
                  const handleBadgeClick = () => {
                    if (isSelected) {
                      setBadgeChange("");
                    } else {
                      setBadgeChange(value.name as string);
                      setBadgeId(value.id);
                    }
                  };

                  return (
                    <Badge mbti={value.name}></Badge>
                    // <p
                    //   key={idx}
                    //   css={[
                    //     selectBadge(value),
                    //     isSelected && {
                    //       border: `0.2rem solid ${COLOR.MAIN1} `,
                    //       padding: `0.6rem 0.5rem`,
                    //       display: "flex",
                    //       alignItems: "center",
                    //     },
                    //   ]}
                    //   onClick={handleBadgeClick}
                    //   style={{ cursor: "pointer" }}
                    // >
                    //   {value.name}
                    // </p>
                  );
                },
              )}
            </div>
            {/* </div> */}
          </Container>

          {/* box3 */}
          <ActivityList profileData={profileData} />
        </div>

        <div css={buttonCSS}>
          <Button addCSS={calcelCSS} onClick={handleCancel}>
            취소하기
          </Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyPageUpdate;

const containerCSS = css`
  padding-top: 3rem;
`;

const mainTitleCSS = css`
  display: flex;
  align-items: center;
  margin: 2rem 0 0 0;
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
`;

const boxContainerCSS = css`
  display: flex;
  width: 100%;
  margin: 1.5rem 0 3rem;
`;

const box1CSS = css`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.MAIN3};
  width: 30%;
  flex: 1;
  border-radius: 1.875rem;
  margin-right: 2.875rem;
  padding: 2.5rem 2.125rem 0 2.125rem;
`;

const box2CSS = css`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.MAIN3};
  width: 50%;

  height: 28rem;
  border-radius: 1.875rem;
  margin-right: 2.875rem;
`;

const subTitleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.GRAY1};
`;

const subTitle2CSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.GRAY1};
  padding-top: 1rem;
`;

const profileContainerCSS = css`
  margin: 0.625rem 0 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;

const profileImageContainerCSS = css`
  width: 12.125rem;
  height: 12.125rem;
  overflow: hidden;
  border-radius: 6.25rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const collectedTitleContainer = css`
  margin: 0.625rem 0 0.625rem;
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.625rem;
  row-gap: 0.625rem;
`;

const badgeCSS1 = css`
  height: 1.4375rem;
  border-radius: 1.25rem;
  padding: 0.1875rem 0.625rem;
  background-color: #f8caff;
  color: white;
  width: fit-content;
`;

const badgeCSS2 = css`
  height: 1.4375rem;
  border-radius: 1.25rem;
  padding: 0.1975rem 0.625rem;
  background-color: #5be1a9;
  color: white;
  width: fit-content;
`;
const badgeCSS3 = css`
  height: 1.4375rem;
  border-radius: 1.25rem;
  padding: 0.1975rem 0.625rem;
  background-color: #ad71ea;
  color: white;
  width: fit-content;
`;
const badgeCSS4 = css`
  height: 1.4375rem;
  border-radius: 1.25rem;
  padding: 0.1975rem 0.625rem;
  background-color: #9ecbff;
  color: white;
  width: fit-content;
`;

const calcelCSS = css`
  opacity: 0.5;
  margin-right: 1rem;
`;

const buttonCSS = css`
  display: flex;
  justify-content: flex-end;
  margin-right: 5rem;
  margin-top: -5rem;
`;

const cancelCSS2 = css`
  position: absolute;
  top: 0;
  right: 0;
`;
//------------MBTI-----------//

const userinfoCSS = css`
  display: flex;
  justify-content: center;
  max-width: 100rem;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const mbtiCSS = css`
  border: 0.1rem solid ${COLOR.GRAY4};
  font-size: ${FONT.SIZE.TITLE3};
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  text-align: center;
`;
const mbtiBox = css`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  text_align: center;
  margin-right: 1rem;
`;

const mbtiContainerCSS = css`
  display: flex;
  align-items: center;
  position: relative;
  text_align: center;
`;

const warningMessageCSS = css`
  padding-top: 1rem;
  color: red;
`;

const warningContainerCSS = css`
  font-size: ${FONT.SIZE.BODY};
`;
const arrowContainerCSS = css`
  position: absolute;
  left: 70%;
  transform: translateX(-50%);
  top: 33%;
  transform: translateY(-50%);
  padding-right: 0.4rem;
  padding-left: 0.4rem;
`;
// -------프로필 사진 ---
const uploadLabelCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  // height: 100%;
  // border: 1.5px solid ${COLOR.GRAY4};
  border-radius: 0.5rem;
`;
const uploadInputCSS = css`
  display: none;
`;
const imageCSS = css`
  width: auto;
  height: auto;
  max-height: 12.125rem;
  // object-fit: contain;
`;

const settingCSS = css`
  padding-top: 1rem;
  cursor: pointer;
  text-decoration-line: underline;
  color: ${COLOR.GRAY2};
`;
