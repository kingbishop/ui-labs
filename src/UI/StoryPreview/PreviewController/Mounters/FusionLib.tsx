import Roact from "@rbxts/roact";
interface FusionLibProps {}

function setProps(props: FusionLibProps) {
	return props as Required<FusionLibProps>;
}

function FusionLib(setprops: FusionLibProps) {
	const props = setProps(setprops);
	return <></>;
}

export default FusionLib;
