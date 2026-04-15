"use client"

import { motion, useReducedMotion } from "motion/react"

export function TaptickitIllustration({ isCardHovered = false }) {
  const prefersReducedMotion = useReducedMotion()

  const pw = 70
  const ph = 130
  const cx = 200
  const cy = 150

  const cos30 = Math.cos(Math.PI / 6)
  const sin30 = 0.5

  const isoX = (ix, iy) => cx + (ix - pw / 2) * cos30 - (iy - ph / 2) * cos30
  const isoY = (ix, iy) => cy + (ix - pw / 2) * sin30 + (iy - ph / 2) * sin30

  const isoRect = (x, y, w, h) => {
    const tl = [isoX(x, y), isoY(x, y)]
    const tr = [isoX(x + w, y), isoY(x + w, y)]
    const br = [isoX(x + w, y + h), isoY(x + w, y + h)]
    const bl = [isoX(x, y + h), isoY(x, y + h)]
    return `M ${tl[0]} ${tl[1]} L ${tr[0]} ${tr[1]} L ${br[0]} ${br[1]} L ${bl[0]} ${bl[1]} Z`
  }

  const isoRoundRect = (x, y, w, h, r) => {
    const cr = Math.min(r, w / 2, h / 2)
    const tl = [isoX(x, y), isoY(x, y)]
    const tr = [isoX(x + w, y), isoY(x + w, y)]
    const br = [isoX(x + w, y + h), isoY(x + w, y + h)]
    const bl = [isoX(x, y + h), isoY(x, y + h)]
    const tlTop = [isoX(x + cr, y), isoY(x + cr, y)]
    const tlLeft = [isoX(x, y + cr), isoY(x, y + cr)]
    const trTop = [isoX(x + w - cr, y), isoY(x + w - cr, y)]
    const trRight = [isoX(x + w, y + cr), isoY(x + w, y + cr)]
    const brRight = [isoX(x + w, y + h - cr), isoY(x + w, y + h - cr)]
    const brBot = [isoX(x + w - cr, y + h), isoY(x + w - cr, y + h)]
    const blBot = [isoX(x + cr, y + h), isoY(x + cr, y + h)]
    const blLeft = [isoX(x, y + h - cr), isoY(x, y + h - cr)]
    return [
      `M ${tlTop[0]} ${tlTop[1]}`,
      `L ${trTop[0]} ${trTop[1]}`,
      `Q ${tr[0]} ${tr[1]} ${trRight[0]} ${trRight[1]}`,
      `L ${brRight[0]} ${brRight[1]}`,
      `Q ${br[0]} ${br[1]} ${brBot[0]} ${brBot[1]}`,
      `L ${blBot[0]} ${blBot[1]}`,
      `Q ${bl[0]} ${bl[1]} ${blLeft[0]} ${blLeft[1]}`,
      `L ${tlLeft[0]} ${tlLeft[1]}`,
      `Q ${tl[0]} ${tl[1]} ${tlTop[0]} ${tlTop[1]}`,
      "Z",
    ].join(" ")
  }

  // ── Table slab — contained within the card with clear margins ──
  const tw = 130 // table width
  const th = 200 // table height
  const td = 7   // table depth/thickness
  const tox = (pw - tw) / 2 // center table around phone
  const toy = (ph - th) / 2

  // Table top face
  const tableTop = isoRect(tox, toy, tw, th)

  // Table front face (bottom edge — visible in isometric)
  // Bottom edge of table top goes from bottom-left to bottom-right
  // Front face drops down by `td` pixels
  const tbl = [isoX(tox, toy + th), isoY(tox, toy + th)]
  const tbr = [isoX(tox + tw, toy + th), isoY(tox + tw, toy + th)]
  const tblD = [tbl[0], tbl[1] + td]
  const tbrD = [tbr[0], tbr[1] + td]
  const tableFront = `M ${tbl[0]} ${tbl[1]} L ${tbr[0]} ${tbr[1]} L ${tbrD[0]} ${tbrD[1]} L ${tblD[0]} ${tblD[1]} Z`

  // Table right face (right edge — visible in isometric)
  const ttr = [isoX(tox + tw, toy), isoY(tox + tw, toy)]
  const ttrD = [ttr[0], ttr[1] + td]
  const tableRight = `M ${ttr[0]} ${ttr[1]} L ${tbr[0]} ${tbr[1]} L ${tbrD[0]} ${tbrD[1]} L ${ttrD[0]} ${ttrD[1]} Z`

  // ── Phone ──
  const bezel = 2.5
  const bodyPath = isoRoundRect(0, 0, pw, ph, 11)
  const screenPath = isoRoundRect(bezel, bezel, pw - bezel * 2, ph - bezel * 2, 9)

  // Dynamic Island
  const diW = 24
  const diH = 7
  const diX = (pw - diW) / 2
  const diY = bezel + 4
  const diPath = isoRoundRect(diX, diY, diW, diH, 3.5)

  // Screen content
  const contentL = bezel + 4
  const contentR = pw - bezel - 4

  // ── Haptic Engine Icon (screen center) ──
  const hCx = pw / 2
  const hCy = ph / 2 + 2
  const hRectW = 14
  const hRectH = 10
  const hSpread = 22

  const hapticRect = isoRoundRect(hCx - hRectW / 2, hCy - hRectH / 2, hRectW, hRectH, 2.5)
  const hapticInner = isoRoundRect(hCx - hRectW / 2 + 2, hCy - hRectH / 2 + 2, hRectW - 4, hRectH - 4, 1.5)

  const hDots = [
    { x: hCx, y: hCy - hSpread, label: "top" },
    { x: hCx, y: hCy + hSpread, label: "bottom" },
    { x: hCx - hSpread * 0.75, y: hCy, label: "left" },
    { x: hCx + hSpread * 0.75, y: hCy, label: "right" },
  ]

  const hCenter = { cx: isoX(hCx, hCy), cy: isoY(hCx, hCy) }
  const hDotPositions = hDots.map(d => ({
    cx: isoX(d.x, d.y),
    cy: isoY(d.x, d.y),
    label: d.label,
  }))

  const homeBar = isoRoundRect((pw - 20) / 2, ph - bezel - 6, 20, 2, 1)

  // ── Phone thickness (3D depth) ──
  const pd = 4 // phone depth/thickness

  // Bottom face — along bottom edge of phone, drops down by pd
  // We trace from bottom-left corner (with radius offset) to bottom-right (with radius offset)
  const pBotR = 11 // same as body corner radius
  const pbl = [isoX(pBotR, ph), isoY(pBotR, ph)]
  const pbr = [isoX(pw - pBotR, ph), isoY(pw - pBotR, ph)]
  const pblC = [isoX(0, ph), isoY(0, ph)] // corner control point
  const pblE = [isoX(0, ph - pBotR), isoY(0, ph - pBotR)] // end of left curve
  const pbrC = [isoX(pw, ph), isoY(pw, ph)]
  const pbrE = [isoX(pw, ph - pBotR), isoY(pw, ph - pBotR)]
  // Bottom face path (front of phone)
  const phoneFront = [
    `M ${pblE[0]} ${pblE[1]}`,
    `Q ${pblC[0]} ${pblC[1]} ${pbl[0]} ${pbl[1]}`,
    `L ${pbr[0]} ${pbr[1]}`,
    `Q ${pbrC[0]} ${pbrC[1]} ${pbrE[0]} ${pbrE[1]}`,
    `L ${pbrE[0]} ${pbrE[1] + pd}`,
    `Q ${pbrC[0]} ${pbrC[1] + pd} ${pbr[0]} ${pbr[1] + pd}`,
    `L ${pbl[0]} ${pbl[1] + pd}`,
    `Q ${pblC[0]} ${pblC[1] + pd} ${pblE[0]} ${pblE[1] + pd}`,
    "Z",
  ].join(" ")

  // Right face — along right edge of phone, drops down by pd
  const ptr = [isoX(pw, pBotR), isoY(pw, pBotR)]
  const ptrC = [isoX(pw, 0), isoY(pw, 0)]
  const ptrE = [isoX(pw - pBotR, 0), isoY(pw - pBotR, 0)]
  const phoneRight = [
    `M ${ptrE[0]} ${ptrE[1]}`,
    `Q ${ptrC[0]} ${ptrC[1]} ${ptr[0]} ${ptr[1]}`,
    `L ${pbrE[0]} ${pbrE[1]}`,
    `L ${pbrE[0]} ${pbrE[1] + pd}`,
    `L ${ptr[0]} ${ptr[1] + pd}`,
    `Q ${ptrC[0]} ${ptrC[1] + pd} ${ptrE[0]} ${ptrE[1] + pd}`,
    "Z",
  ].join(" ")

  // Volume buttons on the bottom face (left side in phone space = front face in iso)
  // Power button on right face
  const volBtn1Y = ph * 0.3
  const volBtn2Y = ph * 0.42
  const powerBtnY = ph * 0.35

  const phoneCx = isoX(pw / 2, ph / 2)
  const phoneCy = isoY(pw / 2, ph / 2)

  return (
    <div className="relative flex h-[200px] w-full min-w-0 max-w-full items-center justify-center overflow-hidden bg-zinc-100 dark:bg-black">
      <svg
        viewBox="60 50 280 220"
        className="h-full w-full"
        role="img"
        aria-label="Haptic feedback illustration"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="taptickit-table-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#e8e5e0] dark:[stop-color:#1e1d1b]" />
            <stop offset="100%" className="[stop-color:#dbd7d0] dark:[stop-color:#151412]" />
          </linearGradient>
          <linearGradient id="taptickit-table-front" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="[stop-color:#c5c1ba] dark:[stop-color:#141310]" />
            <stop offset="100%" className="[stop-color:#b5b0a8] dark:[stop-color:#0e0d0b]" />
          </linearGradient>
          <linearGradient id="taptickit-table-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="[stop-color:#cec9c2] dark:[stop-color:#18170f]" />
            <stop offset="100%" className="[stop-color:#b8b3ab] dark:[stop-color:#0f0e0c]" />
          </linearGradient>
          <linearGradient id="taptickit-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#c8c8cd] dark:[stop-color:#404045]" />
            <stop offset="100%" className="[stop-color:#9d9da3] dark:[stop-color:#28282c]" />
          </linearGradient>
          <linearGradient id="taptickit-phone-front" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="[stop-color:#a8a8ae] dark:[stop-color:#333338]" />
            <stop offset="100%" className="[stop-color:#8e8e95] dark:[stop-color:#222226]" />
          </linearGradient>
          <linearGradient id="taptickit-phone-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="[stop-color:#b5b5bb] dark:[stop-color:#38383d]" />
            <stop offset="100%" className="[stop-color:#9a9aa1] dark:[stop-color:#28282c]" />
          </linearGradient>
          <linearGradient id="taptickit-screen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#f8f8fa] dark:[stop-color:#141416]" />
            <stop offset="100%" className="[stop-color:#f0f0f2] dark:[stop-color:#0c0c0e]" />
          </linearGradient>
        </defs>

        {/* ── Table slab ── */}
        {/* Top surface */}
        <path
          d={tableTop}
          fill="url(#taptickit-table-top)"
          className="stroke-zinc-400/20 dark:stroke-zinc-600/15"
          strokeWidth={0.5}
          strokeLinejoin="round"
        />
        {/* Front face (thickness) */}
        <path
          d={tableFront}
          fill="url(#taptickit-table-front)"
          className="stroke-zinc-400/20 dark:stroke-zinc-600/15"
          strokeWidth={0.5}
          strokeLinejoin="round"
        />
        {/* Right face (thickness) */}
        <path
          d={tableRight}
          fill="url(#taptickit-table-right)"
          className="stroke-zinc-400/20 dark:stroke-zinc-600/15"
          strokeWidth={0.5}
          strokeLinejoin="round"
        />

        {/* ── Phone shadow on table ── */}
        <path
          d={bodyPath}
          className="fill-black/[0.06] dark:fill-black/[0.35]"
          style={{ filter: "blur(8px)", transform: "translate(4px, 5px)" }}
        />

        {/* ── Haptic vibration waves on table ── */}
        {[28, 44, 60].map((r, i) => (
          <motion.ellipse
            key={`wave-${i}`}
            cx={phoneCx}
            cy={phoneCy}
            rx={r * cos30}
            ry={r * sin30}
            fill="none"
            className="stroke-zinc-500/30 dark:stroke-zinc-400/20"
            strokeWidth={0.8}
            strokeDasharray="4 3"
            style={{ transformOrigin: `${phoneCx}px ${phoneCy}px`, transform: "rotate(-30deg)" }}
            initial={false}
            animate={{
              opacity: isCardHovered ? [0, 0.5 - i * 0.12, 0] : 0,
              scale: isCardHovered ? [0.5, 1, 1.08] : 0.5,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : {
                    duration: 1.3,
                    delay: i * 0.15,
                    repeat: isCardHovered ? Infinity : 0,
                    repeatDelay: 0.5,
                    ease: "easeOut",
                  }
            }
          />
        ))}

        {/* ── Phone — vibration shake group ── */}
        <motion.g
          initial={false}
          animate={
            isCardHovered && !prefersReducedMotion
              ? { x: [0, -2.5, 2.5, -2, 2, -1, 1, -0.5, 0.5, 0], y: [0, 0.5, -0.5, 0.4, -0.4, 0.2, -0.2, 0] }
              : { x: 0, y: 0 }
          }
          transition={
            isCardHovered && !prefersReducedMotion
              ? { duration: 0.35, repeat: Infinity, repeatDelay: 1.0, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          {/* Phone bottom face (front edge — 3D thickness) */}
          <path d={phoneFront} fill="url(#taptickit-phone-front)" className="stroke-zinc-500/20 dark:stroke-zinc-600/15" strokeWidth={0.5} />

          {/* Bottom edge details: speaker grills, USB-C, mic */}
          {/* All positioned along the bottom edge (y=ph) with pd/2 vertical offset for center of thickness */}
          {(() => {
            const yOff = pd * 0.45
            const center = pw / 2

            // USB-C port — center, small rounded rect shape
            const usbL = isoX(center - 4, ph)
            const usbLy = isoY(center - 4, ph) + yOff
            const usbR = isoX(center + 4, ph)
            const usbRy = isoY(center + 4, ph) + yOff

            // Left speaker grills — 3 dots
            const lSpeaker = [center - 14, center - 11, center - 8].map(sx => ({
              cx: isoX(sx, ph),
              cy: isoY(sx, ph) + yOff,
            }))

            // Right speaker grills — 3 dots
            const rSpeaker = [center + 8, center + 11, center + 14].map(sx => ({
              cx: isoX(sx, ph),
              cy: isoY(sx, ph) + yOff,
            }))

            // Mic hole — between USB-C and left speaker
            const mic = {
              cx: isoX(center - 6, ph),
              cy: isoY(center - 6, ph) + yOff,
            }

            return (
              <>
                {/* USB-C port */}
                <line x1={usbL} y1={usbLy} x2={usbR} y2={usbRy}
                  className="stroke-zinc-600/60 dark:stroke-zinc-800/70" strokeWidth={1.8} strokeLinecap="round" />

                {/* Left speaker grills */}
                {lSpeaker.map((s, i) => (
                  <circle key={`ls-${i}`} cx={s.cx} cy={s.cy} r="0.6"
                    className="fill-zinc-600/50 dark:fill-zinc-800/60" />
                ))}

                {/* Right speaker grills */}
                {rSpeaker.map((s, i) => (
                  <circle key={`rs-${i}`} cx={s.cx} cy={s.cy} r="0.6"
                    className="fill-zinc-600/50 dark:fill-zinc-800/60" />
                ))}

                {/* Mic hole */}
                <circle cx={mic.cx} cy={mic.cy} r="0.5"
                  className="fill-zinc-700/50 dark:fill-zinc-900/60" />
              </>
            )
          })()}

          {/* Phone right face (side edge — 3D thickness) */}
          <path d={phoneRight} fill="url(#taptickit-phone-right)" className="stroke-zinc-500/20 dark:stroke-zinc-600/15" strokeWidth={0.5} />

          {/* Volume buttons on left face (visible on front in iso) */}
          {[volBtn1Y, volBtn2Y].map((by, i) => {
            const bx1 = isoX(0, by)
            const by1 = isoY(0, by)
            const bx2 = isoX(0, by + 8)
            const by2 = isoY(0, by + 8)
            return (
              <line key={`vol-${i}`} x1={bx1} y1={by1 + pd * 0.3} x2={bx2} y2={by2 + pd * 0.3}
                className="stroke-zinc-500/50 dark:stroke-zinc-500/40" strokeWidth={1.2} strokeLinecap="round" />
            )
          })}

          {/* Power button on right face */}
          {(() => {
            const bx1 = isoX(pw, powerBtnY)
            const by1 = isoY(pw, powerBtnY)
            const bx2 = isoX(pw, powerBtnY + 14)
            const by2 = isoY(pw, powerBtnY + 14)
            return (
              <line x1={bx1} y1={by1 + pd * 0.3} x2={bx2} y2={by2 + pd * 0.3}
                className="stroke-zinc-400/50 dark:stroke-zinc-500/35" strokeWidth={1.2} strokeLinecap="round" />
            )
          })()}

          {/* Phone body — rounded top face */}
          <path d={bodyPath} fill="url(#taptickit-body)" className="stroke-zinc-400/70 dark:stroke-zinc-500/40" strokeWidth={1.2} />

          {/* Screen — edge-to-edge rounded */}
          <path d={screenPath} fill="url(#taptickit-screen)" />

          {/* Dynamic Island — pill */}
          <path d={diPath} className="fill-zinc-800 dark:fill-black" />
          <circle cx={isoX(diX + diW * 0.73, diY + diH / 2)} cy={isoY(diX + diW * 0.73, diY + diH / 2)} r="1.5" className="fill-zinc-700/70 dark:fill-zinc-900" />
          <circle cx={isoX(diX + diW * 0.73, diY + diH / 2)} cy={isoY(diX + diW * 0.73, diY + diH / 2)} r="0.6" className="fill-zinc-500/40 dark:fill-zinc-600/50" />

          {/* Status bar */}
          <path d={isoRect(contentL, bezel + 3, 12, 1.2)} className="fill-zinc-300/60 dark:fill-zinc-600/40" />
          <path d={isoRect(contentR - 14, bezel + 3, 14, 1.2)} className="fill-zinc-300/60 dark:fill-zinc-600/40" />

          {/* ── Haptic Engine Icon ── */}
          {/* Static base wires (center to each dot) */}
          {hDotPositions.map((dot) => (
            <line
              key={`wire-base-${dot.label}`}
              x1={hCenter.cx}
              y1={hCenter.cy}
              x2={dot.cx}
              y2={dot.cy}
              className="stroke-zinc-300/40 dark:stroke-zinc-600/30"
              strokeWidth={0.5}
            />
          ))}

          {/* Animated pulse traveling along wires (always running) */}
          {hDotPositions.map((dot, i) => {
            const lineLen = Math.hypot(dot.cx - hCenter.cx, dot.cy - hCenter.cy)
            return (
              <motion.line
                key={`wire-pulse-${dot.label}`}
                x1={hCenter.cx}
                y1={hCenter.cy}
                x2={dot.cx}
                y2={dot.cy}
                fill="none"
                className="stroke-zinc-400 dark:stroke-zinc-400"
                strokeWidth={1}
                strokeLinecap="round"
                strokeDasharray={`4 ${lineLen}`}
                initial={{ strokeDashoffset: lineLen, opacity: 0.7 }}
                animate={{ strokeDashoffset: [lineLen, -lineLen], opacity: 0.7 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.15 }
                    : {
                        duration: 1.0,
                        delay: i * 0.15,
                        repeat: Infinity,
                        repeatDelay: 0.4,
                        ease: "linear",
                      }
                }
              />
            )
          })}

          {/* Connector dots at endpoints (always pulsing) */}
          {hDotPositions.map((dot, i) => (
            <motion.circle
              key={`dot-${dot.label}`}
              cx={dot.cx}
              cy={dot.cy}
              r={2}
              className="fill-zinc-400 dark:fill-zinc-500"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : {
                      duration: 0.8,
                      delay: 0.2 + i * 0.12,
                      repeat: Infinity,
                      repeatDelay: 0.8,
                      ease: "easeInOut",
                    }
              }
              style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }}
            />
          ))}

          {/* Central haptic engine rectangle (shakes on hover) */}
          <motion.g
            initial={false}
            animate={
              isCardHovered && !prefersReducedMotion
                ? { x: [0, -1.5, 1.5, -1, 1, -0.5, 0.5, 0], y: [0, 0.3, -0.3, 0.2, -0.2, 0] }
                : { x: 0, y: 0 }
            }
            transition={
              isCardHovered && !prefersReducedMotion
                ? { duration: 0.3, repeat: Infinity, repeatDelay: 1.1, ease: "easeInOut" }
                : { duration: 0.2 }
            }
          >
            <path d={hapticRect} className="fill-zinc-200/80 dark:fill-zinc-700/60 stroke-zinc-400/60 dark:stroke-zinc-500/35" strokeWidth={0.6} />
            <path d={hapticInner} className="fill-zinc-300/70 dark:fill-zinc-600/45" />
          </motion.g>

          {/* Home indicator */}
          <path d={homeBar} className="fill-zinc-300/80 dark:fill-zinc-600/60" />
        </motion.g>
      </svg>
    </div>
  )
}
