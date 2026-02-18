import Button from "@/ui/Button/Button";
import { ProgressContext } from "@/context/ProgressContext";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import FormContainer from "../ui/FormContainer/FormContainer";
import useShipmentForm from "./model/useShipmentForm";
import Input from "@/ui/Input/Input";
import Select from "@/ui/Select/Select";
import style from "./ShipmentForm.module.scss";
import { Controller } from "react-hook-form";
import { ACTION_TYPES } from "@/provider/ActionTypes";

import useCountriesApi from "@/hooks/useCountriesApi";
import useRegionsApi from "@/hooks/useRegionsApi.js";
import { generateOrderNumber } from "@/utils/orderNumber";
import { submitOrderFake } from "@/api/apiSubmitOrder";
import frontRoutes from "@/routes/frontRoutes";

function ShipmentForm() {
  const navigate = useNavigate();
  const { state, dispatch: dispatchProgress } = useContext(ProgressContext);
  const { dispatch: dispatchCartList } = useContext(CartContext);
  const {
    countries,
  } = useCountriesApi();

  const {
    regions,
     fetchRegions,
  } = useRegionsApi();

  const {
    register,
    watch,
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useShipmentForm(state?.formData || {});

  const selectedCountry = watch("country");

  useEffect(() => {
    if (selectedCountry) {
      fetchRegions(selectedCountry);
    }
  }, [selectedCountry]);

  const onChange = (e, field) => {
    const data = getValues();
    dispatchProgress({
      type: ACTION_TYPES.SAVE_FORM_DATA,
      payload: { ...data, [field]: e.target.value },
    });
  };

  const handleCountry = (selectedCountry, field) => {
    const data = getValues();
    dispatchProgress({
      type: ACTION_TYPES.SAVE_FORM_DATA,
      payload: {
        ...data,
        countryName: selectedCountry?.name,
        [field]: selectedCountry?.iso2,
      },
    });
  };
  const handleRegion = (selectedRegions, field) => {
    const data = getValues();
    dispatchProgress({
      type: ACTION_TYPES.SAVE_FORM_DATA,
      payload: {
        ...data,
        regionName: selectedRegions?.label,
        [field]: selectedRegions?.value,
      },
    });
  };

  const onSubmit = async (stepId) => {
    const valid = await trigger([
      "address",
      "extraAddress",
      "city",
      "zipCode",
      "country",
      "state",
    ]);

    const data = getValues();
    if (!valid) return;

    const orderPayload = {
      ...state.formData,
      ...data,
      orderDate: new Date().toISOString(),
      orderNumber: generateOrderNumber(),
      shipping: 0,
      tax: 0,
      status: "pending",
    };

    dispatchProgress({
      type: ACTION_TYPES.SAVE_FORM_DATA,
      payload: orderPayload,
    });

    try {
      localStorage.setItem("lastOrder", JSON.stringify(orderPayload));
      await submitOrderFake(orderPayload);
      dispatchProgress({
        type: ACTION_TYPES.CLEAR_FORM_DATA,
      });
      dispatchCartList({
        type: ACTION_TYPES.CLEAR_CART,
      });

      navigate(frontRoutes.pages.order);
    } catch (e) {
      console.error("Unable to create order:", e);
      navigate(frontRoutes.pages.cart);
    }
  };

  return (
    <div className="page__container">
      <FormContainer>
        <form className={style.shipmentForm}>
          <div className={style.shipmentForm__address}>
            <Input
              label="Address (No P. O. Boxes)*"
              placeholder="Enter your address"
              error={errors.address?.message}
              {...register("address", {
                onChange: (e) => onChange(e, "address"),
              })}
            />
            <Input
              label="Apartment, suite etc. (optional)"
              placeholder="Enter your apartment information"
              error={errors.extraAddress?.message}
              {...register("extraAddress", {
                onChange: (e) => onChange(e, "extraAddress"),
              })}
            />
            <Input
              label="City*"
              placeholder="Enter your city"
              error={errors.city?.message}
              {...register("city", { onChange: (e) => onChange(e, "city") })}
            />
          </div>
          <div className={style.shipmentForm__region}>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select
                  label="Country/Region*"
                  placeholder="Select your country/region"
                  options={countries.map((c) => ({
                    label: c.name,
                    value: c.iso2,
                  }))}
                  value={field.value}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const selectedCountry = countries.find(
                      (c) => c.iso2 === selectedValue
                    );

                    field.onChange(selectedValue);
                    handleCountry(selectedCountry, "country");
                  }}
                  error={errors.country?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <Select
                  label="State*"
                  placeholder="Select your state"
                  options={regions.map((r) => ({
                    label: r.label,
                    value: r.value,
                  }))}
                  value={field.value}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const selectedRegions = regions.find(
                      (r) => r.value === selectedValue
                    );

                    field.onChange(selectedValue);
                    handleRegion(selectedRegions, "state");
                  }}
                  error={errors.state?.message}
                />
              )}
            />

            <Input
              label="ZIP code*"
              width="250px"
              placeholder="Enter your ZIP code"
              error={errors.zipCode?.message}
              {...register("zipCode", {
                onChange: (e) => onChange(e, "zipCode"),
              })}
            />
          </div>
        </form>
      </FormContainer>
      <div className={style.buttonWrapper}>
        <Button onClick={() => onSubmit("shipment")} wClass={style.wBig}>
          Submit order
        </Button>
      </div>
    </div>
  );
}

export default ShipmentForm;
