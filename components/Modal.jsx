import React, { useState, useEffect } from "react";
import { Fugaz_One } from "next/font/google";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
function Modal({ isOpen, setIsOpen, selectedDate, existingData, onSave }) {
  const [mood, setMood] = useState(existingData?.mood || null);
  const [message, setMessage] = useState(existingData?.message || "");
  const moods = {
    Happy: "😀",
    Sad: "🙃",
    Existing: "😇",
    Good: "😉",
    Elated: "🥰",
  };
  useEffect(() => {
    if (existingData) {
      setMood(existingData.mood);
      setMessage(existingData.message);
    }
  }, [existingData]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(mood, message, selectedDate);
    setIsOpen(false);
  };

  return (
    <div
      id="modalOverlay"
      onClick={(e) => e.target.id === "modalOverlay" && setIsOpen(false)}
      className="fixed h-screen w-screen inset-0 flex items-center justify-center bg-black bg-opacity-35"
    >
      <div
        className="max-w-6xl mx-10 bg-white p-6 rounded-3xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={"text-center capitalized textGradient text-2xl " + fugaz.className}>Edit Mood & Message</h2>
        <p className="text-gray-500 italic my-2">Editing for: {selectedDate}</p>

        <label className={"text-center capitalized textGradient " + fugaz.className}>Select Mood:</label>
        <div className="mt-2 flex items-stretch flex-wrap gap-4 my-10">
          {Object.keys(moods).map((m, i) => {
            return (
              <button
                onClick={() => setMood(i + 1)}
                className={`p-4 px-10 rounded-2xl purpleShadow duration-200 ${
                  i + 1 != mood ? "bg-indigo-50" : "bg-[#818cf8]"
                }  hover:bg-indigo-200 flex flex-col flex-1 items-center gap-2`}
                key={i}
              >
                <p className="text-4xl sm:text-5xl md:text-6xl">{moods[m]}</p>
                <p
                  className={
                    `${
                      i + 1 != mood ? "text-indigo-500" : "text-white"
                    } text-xs sm:text-sm md:text-base ` + fugaz.className
                  }
                >
                  {m}
                </p>
              </button>
            );
          })}
        </div>

        <label className={"text-center capitalized textGradient " + fugaz.className}>Your Message:</label>
        <textarea
          className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring "
          placeholder="Write about your day..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
