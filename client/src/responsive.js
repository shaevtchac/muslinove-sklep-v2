import { css } from "@emotion/react";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 600px) {
      ${props}
    }
  `;
};
