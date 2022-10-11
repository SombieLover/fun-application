import styles from './index.module.scss';
import { useState, useEffect, useMemo } from 'react';
import { map, pipe } from 'rxjs';

/* eslint-disable-next-line */
export interface TasksProps {
	lists?: any[];
}

export function Tasks(props: TasksProps) {
	const [todo, setTodo] = useState([]);
	const [current, setCurrent] = useState([]);
	const [complete, setComplete] = useState([]);

	const [lists, setLists] = useState([]);

	const getLists = () => {
		fetch('http://localhost:3333/api/list', { method: 'GET' })
			.then((response) => response.text())
			.then((body) => JSON.parse(body))
			.then((lists) => {
				setLists(lists);
			});
	};

	useMemo(() => {
		getLists();
	}, []);

	const setList = (event) => {
		const list = lists.find((list) => list.uuid == event.target.value);
		setTodo(
			list.items.filter((item) => {
				return item.complete == false;
			})
		);
		setComplete(
			list.items.filter((item) => {
				return item.complete == true;
			})
		);
	};

	return (
		<div className={styles['container']}>
			<div className="container">
				<div className="row d-flex justify-content-center align-items-center">
					<div className="col-12 col-md-6 col-lg-4">
						<select
							onChange={setList}
							className="form-select form-select-lg bg-dark text-light mb-4"
						>
							<option value="" disabled selected>
								Select a list
							</option>
							{lists.map((list) => {
								return (
									<option key={list.uuid} value={list.uuid}>
										{list.listName}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div className="col-12">
							<div className={`${styles.card} card p-3 shadow border-0`}>
								<p className="text-lead fw-bolder mb-2 ps-4">Todo Items</p>
								<hr />
								<dl className={styles.list}>
									{todo.map((item, index) => {
										return (
											<div
												key={item.uuid}
												className={`${
													index % 2 == 1 ? styles.even : styles.odd
												} d-flex flex-row justify-content-between`}
											>
												<dt>{item.itemName}</dt>
												<dd>
													<button className="btn btn-md btn-info">Mark Complete</button>
												</dd>
											</div>
										);
									})}
								</dl>
							</div>
						</div>
					</div>
					<div className="col">
						<div className="col-12">
							<div className={`${styles.card} card p-3 shadow border-0`}>
								<p className="text-lead fw-bolder mb-2 ps-4">In Progress Items</p>
								<hr />
								<dl>
									<div>
										<dt></dt>
										<dd></dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
					<div className="col">
						<div className="col-12">
							<div className={`${styles.card} card p-3 shadow border-0`}>
								<p className="text-lead fw-bolder mb-2 ps-4">Finished Items</p>
								<hr />
								<dl className={styles.list}>
									{complete.map((item, index) => {
										return (
											<div
												key={item.uuid}
												className={`${
													index % 2 == 1 ? styles.odd : styles.even
												} d-flex flex-row justify-content-between`}
											>
												<dt>{item.itemName}</dt>
												<dd>
													<button className="btn btn-md btn-info">Mark Complete</button>
												</dd>
											</div>
										);
									})}
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Tasks;
