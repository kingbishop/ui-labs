import Roact from "@rbxts/roact";
import Functional from "./Functional";
import RoactLib from "./RoactReact/RoactLib";
import ReactLib from "./RoactReact/ReactLib";

export interface MounterProps<T extends MountType> {
	Entry: PreviewEntry;
	Result: MountResults[T];
	MountFrame: Frame;
}

export type Mounter<T extends MountType> = Roact.FunctionComponent<MounterProps<T>>;

const MountingMap: { [K in MountType]: Mounter<K> } = {
	Functional: Functional,
	RoactLib: RoactLib,
	ReactLib: ReactLib,
};
export default MountingMap;
