import ChatLeft from "../Components/Chatleft";
import Chatmiddle from "../Components/Chatmiddle";
import Chatright from "../Components/Chatright";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
export default function Chat() {
  return (
    <div className="flex-1 h-full" >
      <PanelGroup direction="horizontal">
        <Panel defaultSize={25} minSize={15}>
          <ChatLeft />
        </Panel>
        <PanelResizeHandle className="w-1 bg-gray-600 hover:bg-blue-500 cursor-col-resize" />
        <Panel defaultSize={60} minSize={30}>
          <Chatmiddle />
        </Panel>
        <PanelResizeHandle className="w-1 bg-gray-600 hover:bg-blue-500 cursor-col-resize" />
        <Panel defaultSize={40} minSize={25}>
          <Chatright />
        </Panel>
      </PanelGroup>
    </div>
  );
}
