import { ReactComponent as Smile } from '../img/smile.svg'
import { ReactComponent as Dead } from '../img/dead.svg'
import { ReactComponent as Settings } from '../img/settings.svg'
import { ReactComponent as Podium } from '../img/podium.svg'
import { ReactComponent as Cool } from '../img/cool.svg'
import Button from './UI/Button'
import styles from './Panel.module.css'

function Panel({ openModal }) {
  return (
    <div className={styles.panel}>
      <h3>000</h3>
      <Button onClick={openModal}>
        <Settings />
      </Button>
      <Button>
        <Smile />
      </Button>
      <Button>
        <Podium />
      </Button>
      <h3>000</h3>
    </div>
  )
}

export default Panel
