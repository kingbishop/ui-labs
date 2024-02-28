import { RunService } from "@rbxts/services";
import App from "UI/App";
import Roact from "@rbxts/roact";
import Plugin from "UI/Plugin";
import { Root, createLegacyRoot } from "@rbxts/react-roblox";
import { ReflexProvider } from "@rbxts/react-reflex";
import { RootProducer } from "Reflex";

/* eslint-disable roblox-ts/lua-truthiness */

if (!RunService.IsRunning() || RunService.IsEdit()) {
	const toolbar = plugin.CreateToolbar("UI Labs");
	const pluginButton = toolbar.CreateButton("UI Labs", "Open UI Labs", "rbxassetid://13858107432");
	const stopButton = toolbar.CreateButton("Stop", "Stop UI Labs", "rbxassetid://13960086023");
	const dockWidget = plugin.CreateDockWidgetPluginGui(
		"StoryBook",
		new DockWidgetPluginGuiInfo(Enum.InitialDockState.Left, false, false, 0, 0),
	);

	dockWidget.Title = "UI Labs - Storybook";
	dockWidget.Name = "UILabs";
	dockWidget.ZIndexBehavior = Enum.ZIndexBehavior.Sibling;
	let isOpen = false;

	let pluginRoot: Root | undefined = undefined;

	const buttonConnection = pluginButton.Click.Connect(() => {
		dockWidget.Enabled = !dockWidget.Enabled;
	});
	const stopConnection = stopButton.Click.Connect(() => {
		stopButton.SetActive(false);
		dockWidget.Enabled = false;
		if (pluginRoot) {
			pluginRoot.unmount();
			pluginRoot = undefined;
			RootProducer.resetState();
		}
	});

	dockWidget.BindToClose(() => {
		dockWidget.Enabled = false;
	});
	const dockEnableConnection = dockWidget.GetPropertyChangedSignal("Enabled").Connect(() => {
		pluginButton.SetActive(dockWidget.Enabled);
		isOpen = dockWidget.Enabled;
		if (dockWidget.Enabled && !pluginRoot) {
			const pluginApp = (
				<ReflexProvider producer={RootProducer}>
					<Plugin Plugin={plugin} DockWidget={dockWidget}></Plugin>
				</ReflexProvider>
			);

			pluginRoot = createLegacyRoot(dockWidget);
			pluginRoot.render(pluginApp);
		}
	});
	plugin.Unloading.Connect(() => {
		if (pluginRoot) {
			pluginRoot.unmount();
		}
		RootProducer.resetState();
		buttonConnection.Disconnect();
		stopConnection.Disconnect();
		dockEnableConnection.Disconnect();
	});
}