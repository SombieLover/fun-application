import styles from './appbar.module.scss';
import {
	IoMenuOutline,
	IoPerson,
	IoListOutline,
	IoQrCode,
} from 'react-icons/io5';
import Link from 'next/link';

/* eslint-disable-next-line */
export interface AppbarProps {
	user?: any;
}

export function Appbar(props: AppbarProps) {
	return (
		<div className={`${styles.appBar} row p-3`}>
			<div className="col h2 d-flex justify-content-start text-light">
				<IoMenuOutline />
			</div>
			<div className="col">
				<p className="h2 text-light text-center fw-bolder m-0">Toolbox</p>
			</div>
			<div className="col h2 d-flex justify-content-end text-light">
				<Link href={'#'}>
					<IoPerson className={styles.accountButton} style={{ cursor: 'pointer' }} />
				</Link>
			</div>
		</div>
	);
}

export default Appbar;
