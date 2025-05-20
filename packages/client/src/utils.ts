import { AspectRatio } from "./types";

export const isDefined = <T>(value: T): value is NonNullable<T> => {
  return value !== undefined && value !== null;
};

export function assertNever(): never {
  throw new Error("Reached 'never' case.");
}

export const convertUnixTimestampToHumanReadable = (unixTimestamp: number) => {
  const inMilliseconds = unixTimestamp * 1000;
  const date = new Date(inMilliseconds);
  return date.toLocaleString();
};

type TGetDisplayDimensions = {
  aspectRatio: AspectRatio;
} & (
  | { width: number; height?: undefined }
  | { height: number; width?: undefined }
);
export const getDisplayDimensions = ({
  aspectRatio,
  width,
  height,
}: TGetDisplayDimensions): { width: number; height: number } => {
  if (isDefined(width)) {
    if (aspectRatio === "16:9") {
      return {
        width,
        height: (width / 16) * 9,
      };
    }
    if (aspectRatio === "1:1") {
      return {
        width,
        height: width,
      };
    }
    if (aspectRatio === "1:2") {
      return {
        width,
        height: width * 2,
      };
    }
    if (aspectRatio === "2:1") {
      return {
        width,
        height: width / 2,
      };
    }
    if (aspectRatio === "3:2") {
      return {
        width,
        height: (width / 3) * 2,
      };
    }
    if (aspectRatio === "4:3") {
      return {
        width,
        height: (width / 4) * 3,
      };
    }
  }
  if (isDefined(height)) {
    if (aspectRatio === "16:9") {
      return {
        width: (height / 9) * 16,
        height,
      };
    }
    if (aspectRatio === "1:1") {
      return {
        width: height,
        height,
      };
    }
    if (aspectRatio === "1:2") {
      return {
        width: height / 2,
        height,
      };
    }
    if (aspectRatio === "2:1") {
      return {
        width: height * 2,
        height,
      };
    }
    if (aspectRatio === "3:2") {
      return {
        width: (height / 2) * 3,
        height,
      };
    }
    if (aspectRatio === "4:3") {
      return {
        width: (height / 3) * 4,
        height,
      };
    }
  }

  return assertNever();
};
