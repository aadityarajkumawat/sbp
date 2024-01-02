"use client";

import { makeEntry } from "@/requests";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface NextButtonProps {
  selected: number;
  showGetDataModal: boolean;
  setShowGetDataModal: Dispatch<SetStateAction<boolean>>;
  clearItemList: () => void;
}

export function NextButton(props: NextButtonProps) {
  const userDataStr = global.window ? localStorage.getItem("userData") : "";
  const userData = userDataStr ? JSON.parse(userDataStr) : null;

  const [form, setForm] = useState({
    name: "",
    phone: "+91",
  });

  const f = async () => {
    if (!userData || !userData.phone) {
      props.setShowGetDataModal(true);
      return;
    }

    const h = await makeEntry();
    console.log({ h });
  };

  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    phoneRef.current?.focus();
  }, []);

  return (
    <div
      className={
        props.showGetDataModal
          ? " bg-zinc-200 flex px-5 w-screen py-3 flex-shrink-0 absolute bottom-0"
          : " bg-violet-100 flex px-5 w-screen py-3 flex-shrink-0 absolute bottom-0"
      }
    >
      {props.showGetDataModal ? (
        <div className="bg-zinc-200 py-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem("userData", JSON.stringify(form));
              props.setShowGetDataModal(false);
              props.clearItemList();
            }}
          >
            <input
              className="text-sm rounded-md w-full px-3 py-2 outline-none mb-3"
              placeholder="Name"
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="text-sm rounded-md w-full px-3 py-2 outline-none"
              placeholder="Phone Number"
              type="tel"
              name="phone"
              value={form.phone}
              ref={phoneRef}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: !e.target.value.startsWith("+91")
                    ? "+91"
                    : e.target.value,
                })
              }
              required
            />

            <button
              type="submit"
              className="bg-teal-500 mt-7 w-full text-white rounded-md py-2"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <button
            onClick={f}
            className="w-full text-white flex justify-center items-center gap-3 bg-violet-400 py-2 rounded-md"
          >
            Next
            {!!props.selected && (
              <div className="bg-violet-400 border border-white rounded-full w-5 h-5 flex items-center justify-center text-white">
                {props.selected}
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
