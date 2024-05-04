import HomePage from '@renderer/pages/HomePage/HomePage'
import ResultsPage from '@renderer/pages/ResultsPage/ResultsPage'
import useNavigation from '@renderer/stores/navigate'

export default function Router() {
  const path = useNavigation((state) => state.path)
  switch (path) {
    case '/':
      return <HomePage />
    case '/results':
      return <ResultsPage />
    default:
      return <HomePage />
  }
}
