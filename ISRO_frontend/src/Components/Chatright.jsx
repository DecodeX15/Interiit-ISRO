import { useContext } from "react";
import { ThemeContext } from "../Context/theme/Themecontext.jsx";

export default function Chatright() {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";
  const bg = isDark ? "#0b0b0d" : "#F8F2E9";
  const text = isDark ? "#ffffff" : "#000000";
  const border = isDark ? "#1f1f22" : "#e3e3e3";

  return (
    <div
      className="h-full flex flex-col"
      style={{ background: bg, color: text, borderLeft: `1px solid ${border}` }}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        <div
          className="p-3 rounded-xl shadow"
          style={{
            background: isDark ? "#1a1a1d" : "#f5f5f5",
            border: `1px solid ${border}`,
          }}
        >
          <p className="text-blue-400 font-semibold text-sm">You</p>
          <p className="mt-1 text-sm">Describe the image.</p>
        </div>

        <div
          className="p-3 rounded-xl shadow"
          style={{
            background: isDark ? "#131317" : "#f7f7f7",
            border: `1px solid ${border}`,
          }}
        >
          <p className="text-green-400 font-semibold text-sm">GeoNLI</p>
          <p className="mt-1 text-sm">This image appears to contain…</p>
        </div>
      </div>

      <div
        className="p-3 flex items-center gap-2"
        style={{ borderTop: `1px solid ${border}` }}
      >
        <input
          placeholder="Ask something..."
          className="flex-1 px-4 py-2 rounded-xl outline-none"
          style={{
            background: isDark ? "#111114" : "#f4f4f4",
            border: `1px solid ${border}`,
            color: text,
          }}
        />

        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm shadow">
          Send
        </button>
      </div>
    </div>
  );
}
