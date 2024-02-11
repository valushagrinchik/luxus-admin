import React, { ChangeEvent, ReactElement, useState } from 'react';
import styles from './SortsList.module.css';
import { ArrowUpIcon } from '../../controls/icons/ArrowUpIcon';
import { ArrowRightIcon } from '../../controls/icons/ArrowRightIcon';
import { EditIcon } from '../../controls/icons/EditIcon';
import classNames from 'classnames';
import { Category, Group, Sort } from '../../types';



type RawProps = {
	openable: boolean, 
	id: number,
	name: string, 
	items?: ReactElement[],
	className?: string;
	checkable?: boolean;
	onCheck?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	onEditBtnClick?: () => void;
}
const Raw = ({ openable, name, id, items, className, checkable, onCheck, onEditBtnClick }: RawProps ) =>{
	const [isOpen, setIsOpen] = useState(false);

	return <div className={classNames(styles.row, className)}>
		<div className={styles.row_header}>

			{ openable && <span className={styles.toggle_btn} onClick={() => setIsOpen(!isOpen)}>
				{
					isOpen ? 
						<ArrowUpIcon color="#0040C1" width={16} height={16} /> : 
						<ArrowRightIcon color="#0040C1" width={16} height={16} />  
				}		
			</span>}
			{checkable && <input type="checkbox" className={styles.checkbox}/>}
			{checkable && <span className={styles.id}>{id}</span>}
			<span className={styles.name}>{name}</span>


			<span className={styles.actions}><EditIcon className='clickable' onClick={onEditBtnClick}/></span>
		</div>
		{openable && !!items?.length &&
			<div className={openable && isOpen ? styles.visible : styles.hidden}>{items?.map(item => item)}</div>
		}
	</div>
}

const SortRaw = ({sort, onEditBtnClick}: {sort: Sort, onEditBtnClick: (data: Group | Category | Sort) => void}) => {
	return <Raw 
		className={styles.sort} 
		openable={false} {...sort} 
		checkable={true} 
		onEditBtnClick={() => onEditBtnClick(sort)}	/>
}
const CategoryRaw = ({category, onEditBtnClick}: {category: Category, onEditBtnClick: (data: Group | Category | Sort) => void}) =>{
	return <Raw 
		className={styles.category} 
		openable={true} {...category} 
		items={category.sorts?.map(sort => 
			<SortRaw sort={sort} key={`sort_${sort.id}`} onEditBtnClick={onEditBtnClick}/>)}
		onEditBtnClick={() => onEditBtnClick(category)}
	/>
}
const GroupRaw = ({group, onEditBtnClick}:{group: Group, onEditBtnClick: (data: Group | Category | Sort) => void}) => {
	return <Raw 
		className={styles.group} 
		openable={true} 
		{...group} 
		items={group.categories?.map(cat => 
			<CategoryRaw key={`category_${cat.id}`} category={cat} onEditBtnClick={onEditBtnClick}/>)}
		onEditBtnClick={() => onEditBtnClick(group)}
	/>
}

export const SortsList = ({openModal}:{openModal: (data: Group | Category | Sort) => void}) =>{

	const sorts = [{
		id: 1,
		name: 'Sort1',
		categoryId: 1
	},{
		id: 2,
		name: 'Sort2',
		categoryId: 1
	},{
		id: 3,
		name: 'Sort3',
		categoryId: 2
	}];

	const categories = [{
		id: 1, 
		name: 'Cat1',
		groupId: 1
	}, {
		id: 2, 
		name: 'Cat2',
		groupId: 1
	}];

	const groups = [{
		id: 1, 
		name: 'Group1'
	}, {
		id: 2, 
		name: 'Group2'
	}];



	const catMap = sorts.reduce<Record<number, any[]>>((sum, cur) => {
		if(cur.categoryId in sum){
			sum[cur.categoryId].push(cur);
		}else{
			sum[cur.categoryId] = [cur];
		}
		return sum;
	}, {})

	const groupMap = categories.reduce<Record<number, any[]>>((sum, cur) => {
		if(cur.groupId in sum){
			sum[cur.groupId].push(cur);
		}else{
			sum[cur.groupId] = [cur];
		}
		return sum;
	}, {})





	return <div className={styles.sorts_list}>
		<div className={styles.header}>
			<input type="checkbox" className={styles.checkbox}/>
			<span className={styles.id}>N°</span>
			<span className={styles.name}>Variedad</span>
		</div>
		
		{groups.map(group => 
			<GroupRaw 
				key={`group_${group.id}`} 
				onEditBtnClick={(data: Group | Category | Sort) => openModal(data)}
				group={{
					...group,
					categories: groupMap[group.id]?.map(cat => ({...cat, sorts: catMap[cat.id]}))
				}}
			/>
		)}
	</div>
}