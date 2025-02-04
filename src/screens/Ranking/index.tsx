import { NavBar, PullToRefresh, Skeleton } from 'antd-mobile'
import TeamsRanking from './components/TeamsRanking'
import useFlashScore from '../../context/FlashScore/useFlashScore'
import { useCallback, useMemo, useState } from 'react'
import MatchButton from '../Match/components/MatchButton'
import PlayersRanking from './components/PlayersRanking'

const Ranking = () => {
  const {
    teams,
    refetchTeam,
    players,
    refetchPlayer,
    refetchMatch,
    refetchStat,
  } = useFlashScore()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const goalscorers = useMemo(
    () => players?.filter((player) => !player?.goalkeeper),
    [players]
  )
  const goalkeepers = useMemo(
    () => players?.filter((player) => player?.goalkeeper) ?? [],
    [players]
  )

  const onRefresh = useCallback(async () => {
    if (refetchTeam === undefined) return
    if (refetchMatch === undefined) return
    if (refetchPlayer === undefined) return
    if (refetchStat === undefined) return
    await Promise.all([
      refetchTeam(),
      refetchMatch(),
      refetchPlayer(),
      refetchStat(),
    ])
  }, [refetchTeam, refetchMatch, refetchPlayer, refetchStat])

  // useEffect(() => {
  //   const handleFetchTeam = async () => {
  //     try {
  //       if (typeof fetchTeam !== 'function') return
  //       if (typeof fetchPlayer !== 'function') return
  //       await Promise.all([fetchTeam(), fetchPlayer()])
  //       // do something
  //     } catch (e) {
  //       navigate(routes.error)
  //     }
  //   }

  //   handleFetchTeam()
  // }, [fetchTeam, fetchPlayer, navigate])

  const renderTabContent = useCallback(() => {
    switch (selectedIndex) {
      case 0: {
        if (teams === undefined)
          return <Skeleton animated className="h-screen w-full rounded-3xl" />
        return (
          <TeamsRanking
            rows={teams.sort((a, b) =>
              b.points - a.points === 0
                ? b.goalDifference - a.goalDifference
                : b.points - a.points
            )}
          />
        )
      }
      case 1: {
        if (goalscorers === undefined)
          return <Skeleton animated className="h-screen w-full rounded-3xl" />
        return (
          <PlayersRanking
            rows={goalscorers.sort((a, b) => b.points - a.points)}
          />
        )
      }
      case 2: {
        if (goalscorers === undefined)
          return <Skeleton animated className="h-screen w-full rounded-3xl" />
        return (
          <PlayersRanking
            rows={goalkeepers.sort((a, b) => b.points - a.points)}
          />
        )
      }
      default:
        return null
    }
  }, [selectedIndex, teams, goalscorers, goalkeepers])

  return (
    <div>
      <NavBar className="sticky top-0 z-10 bg-bgPrimary" backArrow={false}>
        Ranking
      </NavBar>
      <PullToRefresh onRefresh={onRefresh}>
        <div className="flex flex-col gap-5 px-4">
          <div className="flex flex-row gap-4">
            {['POINTS TABLE', 'TOP GOAL SCORERS', 'TOP GOALKEEPERS'].map(
              (name: string, ti: number) => (
                <MatchButton
                  className="h-full w-full"
                  key={`tab-${ti}`}
                  team={{
                    name,
                  }}
                  selected={selectedIndex === ti}
                  onClick={() => setSelectedIndex(ti)}
                />
              )
            )}
          </div>
          <div className="flex flex-col gap-3">{renderTabContent()}</div>
        </div>
      </PullToRefresh>
    </div>
  )
}

export default Ranking
