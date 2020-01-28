import React, { useEffect } from "react";
import SplitPane from "react-split-pane";
import { isRunningInElectron } from "../../utils/electron";
import Main from "../Main/Main";
import { useSockets } from "../shared/stores/SocketStore";
import { useTheme } from "../shared/stores/ThemeStore";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import DesktopMenu from "./DesktopMenu";

const isWindows = navigator.platform.toLowerCase() === "win32";

const AppLayout = React.memo(() => {
  const { theme } = useTheme();
  const { isSocketInitialized, initializeSocket } = useSockets();
  const topbarHeight = isRunningInElectron() && isWindows ? "30px" : "50px";
  const statusbarHeight = "20px";

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    try {
      initializeSocket();
    } catch (error) {
      console.error(`Error at starting socket`, error);
    }
  }, []);

  if (!isSocketInitialized) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={theme} style={{ height: "100%", width: "100%" }}>
        {/* New menubar is only for Windows in this release :( */}
        {isRunningInElectron() && isWindows ? (
          <DesktopMenu />
        ) : (
          <Topbar data-testid="topbar" />
        )}
        <div
          style={{
            paddingTop: `${topbarHeight}`
          }}
          className="h-100 w-100"
        >
          <SplitPane
            data-testid="splitPane"
            split="vertical"
            defaultSize={350}
            maxSize={500}
            style={{
              maxHeight: `calc(100% - ${statusbarHeight})`,
              position: "relative"
            }}
          >
            <Sidebar />
            <Main />
          </SplitPane>
          <div className="statusbar"></div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default AppLayout;
