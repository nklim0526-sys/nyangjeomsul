import { useState, useRef } from 'react'
import StarField from './components/StarField'
import BlackCat from './components/BlackCat'
import Step1_BirthInfo from './components/Step1_BirthInfo'
import Step2_State from './components/Step2_State'
import Step3_Response from './components/Step3_Response'
import { computeSaju } from './lib/saju'
import { streamCatReading, buildFirstMessage } from './lib/api'

export default function App() {
  const [step, setStep] = useState(1)
  const [saju, setSaju] = useState(null)
  const [sajuError, setSajuError] = useState(null)
  const [catState, setCatState] = useState('idle')

  // 대화 히스토리
  const [messages, setMessages] = useState([])
  const [currentText, setCurrentText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamError, setStreamError] = useState(null)
  const accRef = useRef('')

  const callCat = (msgs) => {
    accRef.current = ''
    setCurrentText('')
    setStreamError(null)
    setIsStreaming(true)
    setCatState('thinking')

    streamCatReading({
      messages: msgs,
      onToken: (token) => {
        accRef.current += token
        setCurrentText((prev) => prev + token)
      },
      onDone: () => {
        const finalText = accRef.current
        setMessages([...msgs, { role: 'assistant', content: finalText }])
        setIsStreaming(false)
        setCatState('done')
      },
      onError: (err) => {
        setStreamError(err.message)
        setIsStreaming(false)
        setCatState('idle')
      },
    })
  }

  const handleBirthSubmit = ({ year, month, day, sijin }) => {
    try {
      const result = computeSaju(year, month, day, sijin)
      setSaju(result)
      setSajuError(null)
      setStep(2)
    } catch (e) {
      setSajuError(e.message)
    }
  }

  const handleStateSubmit = (state) => {
    const firstMsg = { role: 'user', content: buildFirstMessage(saju, state) }
    setMessages([firstMsg])
    setStep(3)
    callCat([firstMsg])
  }

  const handleFollowUp = (text) => {
    const newMsg = { role: 'user', content: text }
    const newMessages = [...messages, newMsg]
    setMessages(newMessages)
    callCat(newMessages)
  }

  const handleStartOver = () => {
    setMessages([])
    setCurrentText('')
    setStreamError(null)
    setCatState('idle')
    setStep(1)
  }

  return (
    <div className="min-h-screen bg-[#080818] relative overflow-x-hidden">
      <StarField />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-1">
          <h1 className="font-serif text-2xl text-purple-300 tracking-[0.2em]">냥점술</h1>
          <p className="text-purple-500/50 text-xs mt-1 tracking-widest">검정 고양이의 신비로운 사주 풀이</p>
        </div>

        {/* Cat */}
        <div className="my-4">
          <BlackCat state={catState} />
          {catState === 'thinking' && (
            <p className="text-center text-purple-400/60 text-xs mt-1 animate-pulse font-serif">
              생각 중...
            </p>
          )}
        </div>

        {/* Saju error */}
        {sajuError && (
          <div className="w-full mb-3 bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-2.5 text-red-400 text-xs text-center">
            사주 계산 중 오류가 생겼어. 생년월일을 다시 확인해줘.
          </div>
        )}

        {/* Steps */}
        {step === 1 && <Step1_BirthInfo onSubmit={handleBirthSubmit} />}

        {step === 2 && (
          <Step2_State
            onSubmit={handleStateSubmit}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <Step3_Response
            currentText={currentText}
            isStreaming={isStreaming}
            streamError={streamError}
            onFollowUp={handleFollowUp}
            onStartOver={handleStartOver}
          />
        )}

        {/* Step indicator */}
        <div className="flex gap-2 mt-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? 'bg-purple-400 w-4' : s < step ? 'bg-purple-600 w-1.5' : 'bg-purple-900 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
