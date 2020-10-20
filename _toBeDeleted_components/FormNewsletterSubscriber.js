import theme from "../styles/theme.js";
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {gql} from "@apollo/client";
import { handleApolloError } from "../lib/apollo.js";

export default function FormNewsletterSubscriber() {
  const [hideFormNewsletter, setHide] = useState(false);
  const { register, handleSubmit, errors, setError, clearError } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    validateCriteriaMode: "firstErrorDetected",
    submitFocusError: true,
  });

  const REGISTER_NEWSLETTERSUBSCRIBER_MUTATION = gql`
    mutation newsletterSuscription($email: String!, $name: String!) {
      newsletterSuscription(suscriber: { email: $email, name: $name }) {
        id
      }
    }
  `;

  const [doSuscription] = useMutation(REGISTER_NEWSLETTERSUBSCRIBER_MUTATION, {
    onCompleted: (response) => {
      setHide(true);
    },
    onError: (error) => {
      if (error.graphQLErrors.length > 0) {
        const {
          message,
          extensions: { category, validation },
        } = error.graphQLErrors[0];
        if (category == "validation") {
          if (typeof validation["suscriber.email"] != "undefined")
            setError(
              "email",
              "existingMatch",
              validation["suscriber.email"][0]
            );
          if (typeof validation["suscriber.name"] != "undefined")
            setError("name", "existingMatch", validation["suscriber.name"][0]);
        } else {
          handleApolloError(error);
        }
      } else {
        handleApolloError(error);
      }
    },
  });

  const onSubmit = (data) => {
    doSuscription({
      variables: data,
    });
  };

  const clearInputError = useCallback(
    (event) => clearError(event.target.name),
    [clearError]
  );

  if (hideFormNewsletter) {
    return (
      <p className="newsletterSuccess">
        La suscripción se realizó correctamente.
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          p {
            padding: 50px 0px;
            font-size: 13px;
            font-weight: 100;
            color: #c5c5c5;
            opacity: 0;
            animation: fadeIn 600ms ease 1 forwards;
          }
        `}</style>
      </p>
    );
  }
  return (
    <React.Fragment>
      <p>Recibí noticias, oportunidades y mejores ideas en tu email.</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="newsletterForSubscription"
      >
        <div className="inputs">
          <i className="icon-user"></i>
          <input
            name="name"
            placeholder="Nombre"
            type="text"
            onChange={errors.name ? clearInputError : null}
            ref={register({
              required: "* Este campo es obligatorio",
            })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="inputs">
          <i className="icon-mail"></i>
          <input
            name="email"
            placeholder="E-mail"
            onChange={errors.email ? clearInputError : null}
            type="text"
            ref={register({
              required: "* Este campo es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "* Correo Inválido",
              },
            })}
          />
          {!errors.name && errors.email && (
            <p className="error">{errors.email.message}</p>
          )}
        </div>
        <input type="submit" value="Suscribirme" />
      </form>

      <style jsx>{`
        .inputs {
          position: relative;
          margin-bottom: 6px;
        }
        .inputs i {
          position: absolute;
          color: #cccccc;
          top: 50%;
          left: 3px;
          transform: translateY(-50%);
          z-index: 5;
          font-size: 16px;
        }
        .inputs input {
          display: block;
          color: #666666;
          padding: 6px 10px;
          width: 100%;
          margin: 0 auto;
          font-size: 14px;
          outline: 0;
          font-weight: 500;
          border: 0;
          padding-left: 30px;
          box-sizing: border-box;
          appearance: none;
          border-radius: 3px;
        }
        input[type="submit"] {
          display: block;
          color: white;
          padding: 6px 10px;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
          cursor: pointer;
          margin-bottom: 5px;
          font-size: 15px;
          color: #ffffff;
          background-color: ${theme.colors.primary};
          border: 0;
          border-radius: 3px;
          text-align: center;
          box-sizing: border-box;
          transition: all 0.35s ease;
          appearance: none;
        }
        input[type="submit"]:hover {
          background-color: ${theme.colors.primaryHover};
        }
        .error {
          position: absolute;
          top: 0px;
          left: 0px;
          margin-top: -46px;
          display: block;
          z-index: 500;
          width: 100%;
          box-sizing: border-box;
          color: #fff;
          background-color: #666;
          font-size: 12px;
          padding: 10px;
          text-align: left;
          line-height: 1.5;
          border-radius: 3px;
        }
        .error:after {
          content: "";
          border: 6px solid transparent;
          border-top: 6px solid #666;
          box-sizing: border-box;
          position: absolute;
          z-index: 501;
          bottom: -12px;
          left: 18px;
        }
        p {
          display: block;
          font-size: 14px;
          color: #c5c5c5;
          line-height: 1.2;
          margin-bottom: 10px;
          font-weight: 300;
        }
        @media screen and (max-width: 1180px) {
          input[type="submit"] {
            max-width: 100%;
            padding: 12px 10px;
            box-sizing: border-box;
          }
          .inputs input {
            padding: 13px 10px;
            padding-left: 30px;
          }
        }
      `}</style>
    </React.Fragment>
  );
}
