import { Avatar, List } from 'antd-mobile'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../../routes'
import { getColRef } from '../../../../firebase/service'
import { getDocs, query, where } from 'firebase/firestore'

let querySnapshot

const Players = ({ teamId }: { teamId: string }) => {
  const navigate = useNavigate()
  const [players, setPlayers] = useState<any[]>()

  const fetchPlayers = useCallback(async (teamId: string) => {
    const playerColGroupRef = getColRef('players')
    const q = query(playerColGroupRef, where('teamId', '==', teamId))
    querySnapshot = await getDocs(q)
    const playerDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setPlayers(playerDocs)
  }, [])

  console.log(players)

  useEffect(() => {
    const handleFetchTeam = async () => {
      try {
        if (typeof fetchPlayers !== 'function') return
        await fetchPlayers(teamId)
        // do something
      } catch (e) {
        navigate(routes.error)
      }
    }

    handleFetchTeam()
  }, [teamId, fetchPlayers, navigate])
  if (players === undefined) return <div>Loading</div>
  if (players.length === 0) return <div>No data</div>
  return (
    <List header="Players" mode="card">
      {players.map((player) => (
        <List.Item prefix={<Avatar src="" />} description={player.jerseyNumber}>
          {player.name}
        </List.Item>
      ))}
    </List>
  )
}

export default Players
