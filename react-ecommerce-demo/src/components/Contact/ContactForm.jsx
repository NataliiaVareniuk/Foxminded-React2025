import Button from "@/ui/Button/Button";
import { ProgressContext } from "@/context/ProgressContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import FormContainer from "../ui/FormContainer/FormContainer";
import useContactForm from "./model/useContactForm";
import Input from "@/ui/Input/Input";
import style from "./ContactForm.module.scss";
import { ACTION_TYPES } from "@/provider/ActionTypes";
import frontRoutes from "@/routes/frontRoutes";

function ContactForm() {
  const { state, dispatch } = useContext(ProgressContext);

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useContactForm(state?.formData || {});

  const navigate = useNavigate();

  const nextStepClick = async (stepId) => {
    const valid = await trigger(["firstName", "lastName", "email", "phone"]);
    if (!valid) return;

    const data = getValues();
    dispatch({ type: ACTION_TYPES.SAVE_FORM_DATA, payload: data });
    dispatch({ type: ACTION_TYPES.COMPLETED, payload: stepId });

    navigate(frontRoutes.pages.cart.shipment);
  };

  const onChange = async (e, field) => {
    const value = e.target.value;
    const data = getValues();
    dispatch({
      type: ACTION_TYPES.SAVE_FORM_DATA,
      payload: { ...data, [field]: value },
    });
  };

  return (
    <div className="page__container">
      <FormContainer>
        <form className={style.contactForm}>
          <Input
            label="First name*"
            placeholder="Enter your first name"
            error={errors.firstName?.message}
            {...register("firstName", {
              onChange: (e) => onChange(e, "firstName"),
            })}
          />
          <Input
            label="Last name*"
            placeholder="Enter your last name"
            error={errors.lastName?.message}
            {...register("lastName", {
              onChange: (e) => onChange(e, "lastName"),
            })}
          />
          <Input
            label="Email*"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", { onChange: (e) => onChange(e, "email") })}
          />
          <Input
            label="Phone*"
            placeholder="Enter your phone"
            error={errors.phone?.message}
            {...register("phone", { onChange: (e) => onChange(e, "phone") })}
          />
        </form>
      </FormContainer>
      <div className={style.buttonWrapper}>
        <Button onClick={() => nextStepClick("shipment")} wClass={style.wBig}>
          Next step
        </Button>
      </div>
    </div>
  );
}

export default ContactForm;
