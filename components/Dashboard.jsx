"use client";
import React, { useEffect, useState } from "react";
import Login from "@/components/Login";
import Loading from "@/components//Loading";
import { Fugaz_One } from "next/font/google";
import Calender from "@/components/Calender";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});
  const now = new Date();
  const countValues = () => {
    let total_number_of_day = 0;
    let sum_moods = 0;
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day].mood;
          total_number_of_day++;
          sum_moods += days_mood;
        }
      }
    }
    const average_mood =
      total_number_of_day > 0 ? sum_moods / total_number_of_day : 0;
    return {
      num_days: total_number_of_day,
      average_mood: average_mood.toFixed(2),
    };
  };
  const statuses = {
    ...countValues(),
    time_remaining: `${now.getHours()}h ${60 - now.getMinutes()}m`,
  };
  const handleSetMood = async (mood, message = "", selectedDate) => {
    if (!currentUser) return;

    // Use selectedDate if provided, otherwise use today's date
    let date;
    if (selectedDate) {
      const parts = selectedDate.split("-"); // ["2025", "02", "12"]
      date = new Date(parts[0], parts[1] - 1, parts[2]); // Month is 0-based
    } else {
      date = new Date(); // Default to today
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    try {
      const newData = { ...userDataObj };

      // Ensure Firestore structure exists before assigning values
      if (!newData[year]) newData[year] = {};
      if (!newData[year][month]) newData[year][month] = {};
      if (!newData[year][month][day]) newData[year][month][day] = {};

      // Update mood & message
      newData[year][month][day].mood = mood;
      newData[year][month][day].message = message;

      // Update local state
      setData({ ...newData });
      setUserDataObj({ ...newData });

      // Update Firestore
      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: {
                mood,
                message,
              },
            },
          },
        },
        { merge: true }
      );

      console.log(`Mood updated for ${year}-${month + 1}-${day}:`, {
        mood,
        message,
      });
    } catch (err) {
      console.error("Failed to set data:", err.message);
    }
  };

  const moods = {
    Happy: "😀",
    Sad: "🙃",
    Existing: "😇",
    Good: "😉",
    Elated: "🥰",
  };
  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (!currentUser) {
    return <Login />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-62">
      <div className="grid grid-cols-3 p-4 bg-indigo-50 text-indigo-500 rounded-lg">
        {Object.keys(statuses).map((s, i) => {
          return (
            <div key={i} className="p-4 flex flex-col gap-1 sm:gap-2">
              <p className="font-medium uppercase text-xs sm:text-sm truncate">
                {s.replaceAll("_", " ")}
              </p>
              <p className={"text-base sm:text-lg truncate " + fugaz.className}>
                {statuses[s]}
                {s === "num_days" ? "🔥" : ""}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4">
        {Object.keys(moods).map((m, i) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = i + 1;
                handleSetMood(currentMoodValue);
              }}
              className={
                "p-4 px-10 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-200 flex flex-col flex-1 items-center gap-2"
              }
              key={i}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl">{moods[m]}</p>
              <p
                className={
                  "text-indigo-500 text-xs sm:text-sm md:text-base " +
                  fugaz.className
                }
              >
                {m}
              </p>
            </button>
          );
        })}
      </div>
      <Calender
        completeData={data}
        handleSetMood={handleSetMood}
        isLogin={true}
      />
    </div>
  );
}
