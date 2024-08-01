'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { LuSunMoon } from 'react-icons/lu';

const ToggleThemeBtn = () => {
  const { theme, setTheme } = useTheme();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toggleOn, setToggleOn] = useState(false);

  useEffect(() => {
    if (!toggleOn) setTheme('light');
    else setTheme('dark');
  }, [setTheme, toggleOn]);
  return (
    <button onClick={() => setToggleOn((prev) => !prev)}>
      <LuSunMoon size={20} />
    </button>
  );
};

export default ToggleThemeBtn;
