import { twMerge } from 'tailwind-merge'
import moment from 'moment'
import { Timestamp } from 'firebase/firestore'
import useFlashScore from '../../../../context/FlashScore/useFlashScore'

export type MatchType = {
  id: string
  groupStage: string
  homeTeamId: string
  awayTeamId: string
  playDate: Timestamp
}

export type LiveMatchCardProps = {
  className?: string
  match: MatchType
  selected?: boolean
  onClick?: () => void
  completed?: boolean
}

const LiveMatchCard = ({
  className,
  match,
  selected,
  onClick,
}: LiveMatchCardProps) => {
  const { teams } = useFlashScore()
  if (teams?.length === 0) return null
  const groupStage = match.groupStage
  const homeTeam = teams?.find((team) => team.id === match.homeTeamId)
  const homeName = homeTeam.name
  const homeTeamLogo = homeTeam.logo[0].url
  const awayTeam = teams?.find((team) => team.id === match.awayTeamId)
  const awayTeamName = awayTeam.name
  const awayTeamLogo = awayTeam.logo[0].url
  const week = `Week ${moment(match.playDate.toDate()).week()}`
  const time = moment
    .duration(moment().diff(match.playDate.toDate()))
    .asMinutes()
    .valueOf()
  const timeDisplay =
    time > 90 ? "90+'" : time < 0 ? 'Updating' : `${Math.round(time)}'`
  const homeScore = 0
  const awayScore = 0
  return (
    <button
      className={twMerge(
        'justify-center rounded-4xl bg-white p-5 transition-all',
        selected && 'bg-tertiary',
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p
            className={twMerge(
              'm-0 text-base font-semibold text-black1',
              selected && 'text-white'
            )}
          >
            {groupStage}
          </p>
          <p className="m-0 text-xs text-quaternary">{week}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-1 flex-col items-center justify-center gap-1">
            {homeTeamLogo ? (
              <img
                className="h-14 w-14"
                src={homeTeamLogo}
                alt={`logo-${homeTeamLogo}`}
                loading="lazy"
              />
            ) : null}
            <p
              className={twMerge(
                'm-0 text-sm font-normal text-black2',
                selected && 'text-white'
              )}
            >
              {homeName}
            </p>
            <p className="m-0 text-xs text-quaternary">Home</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p
              className={twMerge(
                'm-0 text-4xl font-bold text-black2',
                selected && 'text-white'
              )}
            >
              {homeScore} : {awayScore}
            </p>
            <div
              className={twMerge(
                'bg-primary/25 rounded-2xl border-1 border-primary px-3 py-2',
                selected && 'bg-white/25'
              )}
            >
              <p
                className={twMerge(
                  'm-0 flex items-center justify-center text-xs text-primary',
                  selected && 'text-white '
                )}
              >
                {timeDisplay}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-1">
            {awayTeamLogo ? (
              <img
                className="h-14 w-14 object-contain"
                src={awayTeamLogo}
                alt={`logo-${homeTeamLogo}`}
                loading="lazy"
              />
            ) : null}
            <p
              className={twMerge(
                'm-0 text-sm font-normal text-black2',
                selected && 'text-white'
              )}
            >
              {awayTeamName}
            </p>
            <p className="m-0 text-xs text-quaternary">Away</p>
          </div>
        </div>
      </div>
    </button>
  )
}

export default LiveMatchCard
