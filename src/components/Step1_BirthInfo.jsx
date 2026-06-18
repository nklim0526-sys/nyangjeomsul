import { useState } from 'react'
import { SIJIN_LIST } from '../lib/saju'

export default function Step1_BirthInfo({ onSubmit }) {
  const [year, setYear] = useState(1998)
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [sijin, setSijin] = useState('')

  const years = Array.from({ length: 71 }, (_, i) => 1940 + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const daysInMonth = new Date(year, month, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const handleMonthChange = (m) => {
    setMonth(m)
    const maxDay = new Date(year, m, 0).getDate()
    if (day > maxDay) setDay(maxDay)
  }

  return (
    <div className="w-full mt-3 animate-fadeIn">
      <div className="bg-[#1a1a2e]/70 border border-purple-500/20 rounded-2xl p-6 space-y-5">
        <p className="text-purple-300 font-serif text-center text-base">언제 태어났어?</p>

        {/* Year / Month / Day */}
        <div className="flex gap-2">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="select-style flex-1 min-w-0"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}년</option>
            ))}
          </select>
          <select
            value={month}
            onChange={(e) => handleMonthChange(Number(e.target.value))}
            className="select-style w-[76px]"
          >
            {months.map((m) => (
              <option key={m} value={m}>{m}월</option>
            ))}
          </select>
          <select
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="select-style w-[76px]"
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}일</option>
            ))}
          </select>
        </div>

        {/* Sijin */}
        <div className="space-y-1.5">
          <p className="text-purple-400/60 text-xs">태어난 시간 (선택)</p>
          <select
            value={sijin}
            onChange={(e) => setSijin(e.target.value)}
            className="select-style w-full"
          >
            {SIJIN_LIST.map((s) => (
              <option key={s.label} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onSubmit({ year, month, day, sijin })}
          className="btn-primary w-full"
        >
          다음으로 →
        </button>
      </div>
    </div>
  )
}
