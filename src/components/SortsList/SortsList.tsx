import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import styles from './SortsList.module.css';
import { ArrowUpIcon } from '../../controls/icons/ArrowUpIcon';
import { ArrowRightIcon } from '../../controls/icons/ArrowRightIcon';
import { EditIcon } from '../../controls/icons/EditIcon';
import classNames from 'classnames';
import { Category, Group, Sort } from '../../types';
import { useGetCategoriesQuery, useGetGroupsQuery, useGetSortsQuery } from '../../api/sortsApi';

export enum SortListGroup {
	group='group',
	category='category',
	sort='sort'
}
interface BaseRawProps  {
	open: boolean,
	children?: ReactNode,
	onEditBtnClick: (data: any) => void;
}

interface RawProps extends BaseRawProps {
	openable: boolean, 
	data: any,
	className?: string;
	checkable?: boolean;
	onCheck?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

interface SortRawProps extends BaseRawProps {
	sort: Sort, 
	onEditBtnClick: (data: Group | Category | Sort) => void
}

interface CategoryRawProps extends BaseRawProps {
	category: Category,
	onEditBtnClick: (data: Group | Category | Sort) => void
}
interface GroupRawProps extends BaseRawProps {
	group: Group,
	onEditBtnClick: (data: Group | Category | Sort) => void
}

const Raw = ({ 
	open,
	children,
	openable, 
	data,
	className, 
	checkable, 
	onCheck, 
	onEditBtnClick
}: RawProps ) =>{
	const [isOpen, setIsOpen] = useState(open);

	useEffect(() => {
		setIsOpen(open)
	},[open])

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
			{checkable && <span className={styles.id}>{data.id}</span>}
			<span className={styles.name}>{data.name}</span>


			<span className={styles.actions}><EditIcon className='clickable' onClick={()=> onEditBtnClick(data)}/></span>
		</div>
		{openable &&
			<div className={openable && isOpen ? styles.visible : styles.hidden}>{children}</div>
		}
	</div>
}

const SortRaw = ({
	open,
	children,
	sort, 
	onEditBtnClick
}: SortRawProps ) => {
	return <Raw 
		open={open}
		className={styles.sort} 
		openable={false} 
		data={sort}
		checkable={true} 
		onEditBtnClick={() => onEditBtnClick(sort)}	>{children}</Raw>
}
const CategoryRaw = ({
	open,
	children,
	category, 
	onEditBtnClick
}: CategoryRawProps) =>{
	return <Raw 
	  open={open}
		className={styles.category} 
		openable={true} 
		data={category} 
		onEditBtnClick={() => onEditBtnClick(category)}
	>{children}</Raw>
}
const GroupRaw = ({
	open,
	group, 
	onEditBtnClick,
	children
}:GroupRawProps) => {
	return <Raw 
	 open={open}
		className={styles.group} 
		openable={true} 
		data={group} 
		onEditBtnClick={() => onEditBtnClick(group)}
	>{children}</Raw>
}

const defineRawConfig = (group: SortListGroup) => {
	switch(group){
		case SortListGroup.group: {
			return {
				group: false,
				category: false,
				sort: false
			}
		}
		case SortListGroup.category: {
			return {
				group: true,
				category: false,
				sort: false
			}
		}
		case SortListGroup.sort: {
			return {
				group: true,
				category: true,
				sort: false
			}
		}
	}

}



interface SortsListProps {
	openModal: (data: Group | Category | Sort) => void
	group?: SortListGroup;
	// TOOD: filter by name 
	search: {search: string, type: SortListGroup}
}

export const SortsList = ({
	openModal,
	group = SortListGroup.sort,
	search
}: SortsListProps) =>{

	const {data: groups} = useGetGroupsQuery()
	const {data: categories} = useGetCategoriesQuery()
	const {data: sorts} = useGetSortsQuery()

	const [config, setConfig] = useState(defineRawConfig(group))

	useEffect(() => {
		setConfig(defineRawConfig(group))
	},[group])


	const catMap = useMemo(() => sorts?.reduce<Record<number, any[]>>((sum, cur) => {
		if(cur.categoryId in sum){
			sum[cur.categoryId].push(cur);
		}else{
			sum[cur.categoryId] = [cur];
		}
		return sum;
	}, {}) || {}, [sorts])

	const groupMap = useMemo(() => categories?.reduce<Record<number, any[]>>((sum, cur) => {
		if(cur.groupId in sum){
			sum[cur.groupId].push(cur);
		}else{
			sum[cur.groupId] = [cur];
		}
		return sum;
	}, {}) || {},[categories])

	const groupedData = useMemo(()=> groups?.map(group => ({
		...group,
		categories: groupMap[group.id]?.map(cat => ({...cat, sorts: catMap[cat.id]}))
	})),[groups, groupMap, catMap])


	return <div className={styles.sorts_list}>
		<div className={styles.header}>
			<input type="checkbox" className={styles.checkbox}/>
			<span className={styles.id}>N°</span>
			<span className={styles.name}>Variedad</span>
		</div>
		
		{groupedData?.map(group => 
			<GroupRaw 
				open={config.group}
				key={`group_${group.id}`} 
				onEditBtnClick={(data: Group | Category | Sort) => openModal(data)}
				group={group}
			>{ group.categories?.map(cat => 
					<CategoryRaw 
						open={config.category}
						key={`category_${cat.id}`} 
						category={cat} 
						onEditBtnClick={(data: Group | Category | Sort) => openModal(data)}>
							{cat.sorts?.map((sort: any) => 
								<SortRaw 
									open={config.sort}
									sort={sort} 
									key={`sort_${sort.id}`} 
									onEditBtnClick={(data: Group | Category | Sort) => openModal(data)}></SortRaw>
							)}
						</CategoryRaw>
			)}</GroupRaw>
		)}
	</div>
}