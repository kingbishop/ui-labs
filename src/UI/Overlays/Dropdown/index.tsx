import Roact, { PropsWithChildren, useCallback } from "@rbxts/roact";
import FrameFill from "UI/Holders/FrameFill";
import Corner from "UI/Styles/Corner";
import TopList from "UI/Styles/List/TopList";
import Padding from "UI/Styles/Padding";
import DropShadow from "UI/Utils/DropShadow";
import Overlay from "../Overlay";
import { useProducer } from "@rbxts/react-reflex";
import { Detector } from "UI/Styles/Detector";
import { useTheme } from "Hooks/Reflex/Use/Theme";
import { useOverlayWrap } from "Hooks/Utils/OutsideWrapper";

interface DropdownProps extends PropsWithChildren {
	Position: UDim2 | Roact.Binding<UDim2>;
	Width?: number;
}

function Dropdown(props: DropdownProps) {
	const theme = useTheme();
	const [wrapped, OnAbsoluteSizeChanged] = useOverlayWrap(props.Position, new Vector2(0, 0), "Y");
	const { resetOverlay } = useProducer<RootProducer>();

	const OnClose = useCallback(() => {
		resetOverlay();
	}, []);

	return (
		<Overlay
			Size={UDim2.fromOffset(props.Width ?? 220, 0)}
			AnchorPoint={wrapped ? new Vector2(0, 1) : new Vector2(0, 0)}
			AutomaticSize={Enum.AutomaticSize.Y}
			Position={props.Position}
			OnClickClose={OnClose}
		>
			<frame
				Key="Holder"
				BackgroundColor3={theme.Dropdown.Color}
				BorderSizePixel={0}
				Size={UDim2.fromScale(1, 0)}
				AutomaticSize={Enum.AutomaticSize.Y}
				ZIndex={2}
				Change={{
					AbsoluteSize: OnAbsoluteSizeChanged,
				}}
			>
				<Corner Radius={4} />
				<Detector Key="InputBlocker">
					<Padding Padding={5} />
					<TopList Padding={new UDim(0, 1)} />
					{props["children"] ?? []}
				</Detector>
			</frame>
			<FrameFill Key={"ShadowHolder"} FillDir="Y" Size={UDim2.fromScale(1, 0)} FrameProps={{ BackgroundTransparency: 1 }}>
				<DropShadow />
			</FrameFill>
		</Overlay>
	);
}

export default Dropdown;
