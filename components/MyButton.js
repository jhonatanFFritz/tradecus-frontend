import { Button, Tooltip } from "@mui/material";
export default function MyButton({ tooltip, color, onClick, variant , text, icon }) {
  return (
    <Tooltip title={tooltip}>
      <Button
        variant={variant ? variant : "contained"}
        color={color ? color : "primary"}
        onClick={onClick}
        startIcon={icon}
      >
        {text}
      </Button>
    </Tooltip>
  );
}
