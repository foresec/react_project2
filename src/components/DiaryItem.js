import React from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  // 날짜
  const writtenMonth = new Date(parseInt(date)).getMonth();
  const nowMonth = new Date().getMonth();

  const unactiveMonth = () => {
    if (writtenMonth < nowMonth && emotion > 3) {
      result = true;
    }
  };

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`edit/${id}`);
  };

  const requestion = () => {
    if (window.confirm("다시 보시겠습니까?")) {
      navigate(`/diary/${id}`);
    }
  };

  return (
    // 시간이 흐르면 옅어지게, goDetail로 가기전 다시 묻기
    <div
      className={[
        "DiaryItem",
        writtenMonth < nowMonth && emotion > 3 ? "unactive" : "",
      ].join(" ")}
    >
      <div
        onClick={writtenMonth < nowMonth && emotion > 3 ? requestion : goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div
        onClick={writtenMonth < nowMonth && emotion > 3 ? requestion : goDetail}
        className="info_wrapper"
      >
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
