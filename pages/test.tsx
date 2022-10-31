import {NextPage} from 'next'
import styles from '@styles/pages/Test.module.scss'
import {Slider} from '@UI'


const Test: NextPage = () => {

    const elements = ['1', '2', '3'].map(element => {
        return (
            <div
                key={element}
                className={styles.main__element}
            >{element}</div>
        )
    })

    return (
        <div className={styles.main}>
            <Slider
                sensibility={20}
                autoPeriod={4}
            >{elements}</Slider>
        </div>
    )
}

export default Test
