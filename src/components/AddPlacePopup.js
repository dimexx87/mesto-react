import React, { useCallback } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { Formik, useFormik } from "formik";
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
    place: Yup.string().required("Required"),
    link: Yup.string().url("Incorrect format блять").required("Required"),
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
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={formik.handleSubmit}
      //onSubmit={handleSubmit}
      name={"addCardForm"}
      title={"Новое место"}
      isLoading={props.isLoading}
      buttonText={props.isLoading ? "Добавление..." : "Добавить"}
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
              // value={formik.values.place}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
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
