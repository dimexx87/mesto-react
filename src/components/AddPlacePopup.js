import React, { useCallback } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { useFormik } from "formik";
import * as Yup from "yup";

export const AddPlacePopup = (props) => {
  const initialValues = {
    place: "",
    link: "",
  };

  const onSubmit = (values) => {
    const { place, link } = values;
    props.onAddPlace({
      place,
      link,
    });
  };

  const validationSchema = Yup.object({
    place: Yup.string()
      .required("Необходимо заполнить")
      .min(2, "Должно содержать минимум 2 символа")
      .max(15, "Должно содержать максимум 15 символов"),
    link: Yup.string()
      .url("Некорректный формат, необходим формат https://... или http://...")
      .required("Необходимо заполнить"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  React.useEffect(() => {
    formik.values.place = "";
    formik.values.link = "";
    formik.touched.place = false;
    formik.touched.link = false;
    formik.isValid = true;
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={formik.handleSubmit}
      name={"addCardForm"}
      title={"Новое место"}
      isLoading={props.isLoading}
      buttonText={props.isLoading ? "Добавление..." : "Добавить"}
      disabled={!formik.isValid}
    >
      {
        <>
          <div className="popup__field popup__field_info_name">
            <input
              type="text"
              placeholder="Название"
              className="popup__text"
              id="place"
              name="place"
              {...formik.getFieldProps("place")}
            />
            {formik.touched.place && formik.errors.place ? (
              <span className="popup__input popup__input-error">
                {formik.errors.place}
              </span>
            ) : null}
          </div>
          <div className="popup__field popup__field_info_other">
            <input
              type="url"
              placeholder="Ссылка на картинку"
              className="popup__text"
              id="link"
              name="link"
              {...formik.getFieldProps("link")}
            />
            {formik.touched.link && formik.errors.link ? (
              <span className="popup__input popup__input-error">
                {formik.errors.link}
              </span>
            ) : null}
          </div>
        </>
      }
    </PopupWithForm>
  );
};
