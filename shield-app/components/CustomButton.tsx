import { ButtonProps } from "@/types/type";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "primary":
      return "bg-[#ffe1e7]";
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-100 border-[0.5px]";
    default:
      return "bg-primary-500";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-white";
    case "secondary":
      return "text-gray-900";
    case "danger":
      return "text-red-400";
    case "success":
      return "text-green-600";
    default:
      return "text-[#ff6380]";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-2xl p-3 flex flex-row justify-center items-center hover:text-white shadow-2xl shadow-rose-50  ${
        isLoading ? "opacity-50" : ""
      } ${getBgVariantStyle(bgVariant)} ${className}`}
      {...props}
      disabled={isLoading}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`text-xl font-pbold ${getTextVariantStyle(textVariant)}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
