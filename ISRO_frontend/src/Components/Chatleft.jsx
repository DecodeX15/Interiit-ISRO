import { useContext } from "react";
import { ThemeContext } from "../Context/theme/Themecontext.jsx";
import { Diff } from "lucide-react";

export default function ChatLeft() {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";
  const bg = isDark ? "#0b0b0d" : "#F8F2E9";
  const text = isDark ? "#ffffff" : "#000000";
  const border = isDark ? "#1f1f22" : "#e3e3e3";

  return (
    <div
      className="h-full flex flex-col"
      style={{
        background: bg,
        color: text,
        borderRight: `1px solid ${border}`,
      }}
    >
      <div
        className="p-4 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${border}` }}
      >
        <h2 className="text-lg font-semibold tracking-wide">Sessions</h2>
        <button className="px-3 py-1 text-sm bg-[#7B3306] hover:bg-[#988d7d] transition rounded-md shadow  cursor-pointer">
          <Diff className="text-black" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {[1, 2, 3].map((s) => (
          <div key={s} className="p-4 cursor-pointer">
            <p className="font-medium group-hover:text-blue-400 transition">Chat {s}</p>
            <p
              className="text-xs mt-1"
              style={{ color: isDark ? "#aaaaaa" : "#555" }}
            >
              2 messages
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
