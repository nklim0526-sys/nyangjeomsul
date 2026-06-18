import { useState } from 'react'

function Slider({ value, onChange, leftLabel, rightLabel }) {
  return (
    <div className="space-y-2">
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="custom-slider w-full"
      />
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500">{leftLabel}</span>
        <span className="text-purple-400 font-medium tabular-nums">{value}</span>
        <span className="text-gray-500">{rightLabel}</span>
      </div>
    </div>
  )
}

export default function Step2_State({ onSubmit, onBack }) {
  const [worry, setWorry] = useState('')
  const [energy, setEnergy] = useState(5)
  const [emotion, setEmotion] = useState(5)
  const [pressure, setPressure] = useState(5)
  const [age, setAge] = useState('')
  const [situation, setSituation] = useState('')

  const canSubmit = worry.trim().length > 0

  return (
    <div className="w-full mt-3 animate-fadeIn">
      <div className="bg-[#1a1a2e]/70 border border-purple-500/20 rounded-2xl p-6 space-y-5">
        <p className="text-purple-300 font-serif text-center text-base">지금 무슨 고민이야?</p>

        <textarea
          value={worry}
          onChange={(e) => setWorry(e.target.value)}
          placeholder="고민이나 결정해야 할 것을 써줘..."
          className="w-full bg-[#0d0d1f] border border-purple-500/20 rounded-xl p-3 text-gray-200 text-sm resize-none h-24 focus:outline-none focus:border-purple-400/50 placeholder:text-gray-600 transition-colors"
        />

        {/* Sliders */}
        <div className="space-y-4">
          <p className="text-purple-400/50 text-xs">지금 나의 상태</p>
          <Slider value={energy} onChange={setEnergy} leftLabel="방전됨 🪫" rightLabel="충전됨 ⚡" />
          <Slider value={emotion} onChange={setEmotion} leftLabel="불안함 🌊" rightLabel="평온함 🌙" />
          <Slider value={pressure} onChange={setPressure} leftLabel="여유로움 ☁️" rightLabel="터질 것 같음 🔥" />
        </div>

        {/* Optional fields */}
        <div className="flex gap-2">
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="나이 (선택)"
            min={1}
            max={120}
            className="input-style w-28 shrink-0"
          />
          <input
            type="text"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="현재 상황 한 줄 (선택)"
            className="input-style flex-1 min-w-0"
          />
        </div>

        <div className="flex gap-2">
          <button onClick={onBack} className="btn-secondary flex-shrink-0 px-4">
            ←
          </button>
          <button
            onClick={() => onSubmit({ worry, energy, emotion, pressure, age: age ? Number(age) : null, situation })}
            disabled={!canSubmit}
            className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            고양이에게 물어보기
          </button>
        </div>
      </div>
    </div>
  )
}
