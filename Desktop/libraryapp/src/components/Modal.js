import React from "react";
/* bu modalda:
    1.baslıgını dışarıdan alacak.(dynamic),
    2.gösterilecek mesajı dışarıdan alacak,
    3.kaç tane buton gösterileceğini dışarodan alabilecek,
    4.butonların içerisindeki yazı,type dışarıdan alınabilecek
    5.butonlara tıklandığında ne yapılacagı dışarıdan alınabilecek
    NOT: Bütün bu özelleştirmeler(customization) prop mantıgı ile yapılabilir
 
 */
const Modal = ({
  title = "",
  content = "",
  confirmButtonText = "Onayla",
  confirmButtonType = "danger",
  confirmButtonClick = () => {},
  hasConfirmButton = false,
  cancelButtonText = "Kapat",
  cancelButtonType = "primary",
  cancelButtonClick = () => {},
  visible = false,
}) => {
  if (visible === false) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          width: "50%",
        }}
      >
        <h1 className="text-center">{title}</h1>
        <p className="text-center my-3">{content}</p>
        <div className="d-flex justify-content-center gap-3 ">
          <button
            onClick={cancelButtonClick}
            className={`btn btn-${cancelButtonType}`}
          >
            {cancelButtonText}
          </button>
          {hasConfirmButton === true && (
            <button
              onClick={confirmButtonClick}
              className={`btn btn-${confirmButtonType}`}
            >
              {confirmButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;
