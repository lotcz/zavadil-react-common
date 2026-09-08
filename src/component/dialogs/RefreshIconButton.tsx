import {BsRepeat} from "react-icons/bs";
import {IconButton} from "../forms";

export type RefreshIconButtonProps = {
	onClick: () => any;
};

export function RefreshIconButton({onClick}: RefreshIconButtonProps) {
	return <IconButton onClick={onClick} icon={<BsRepeat size={24}/>}/>
}

export default RefreshIconButton;
