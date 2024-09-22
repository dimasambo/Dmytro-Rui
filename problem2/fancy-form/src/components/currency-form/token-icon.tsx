import {FC, useEffect, useState} from "react";
import {StyledTokenIcon} from "./styled-currency-form.ts";
import CirclePrompt from "../../icons/circle-prompt.svg";

export const TokenIcon: FC<{ token: string, src: string }> = ({token, src}) => {
  const [imageUrl, setImageUrl] = useState<string>();

  // Check if token icon exists, else show default icon
  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageUrl(src)
    };

    img.onerror = () => {
      setImageUrl(undefined)
    };
  }, [src]);

  return token && imageUrl
    ? (
      <StyledTokenIcon
        src={imageUrl}
        alt={'Token Icon'}
      />
    ) : (
      <StyledTokenIcon src={CirclePrompt} alt={'Token Icon'}/>
    )
}