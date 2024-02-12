import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import styles from './SortsList.module.css';
import { ArrowUpIcon } from '../../controls/icons/ArrowUpIcon';
import { ArrowRightIcon } from '../../controls/icons/ArrowRightIcon';
import { EditIcon } from '../../controls/icons/EditIcon';
import classNames from 'classnames';
import { Category, Group, Sort } from '../../types';
import { useSearchGroupsQuery } from '../../api/sortsApi';
import { CatalogState, selectSortsSearch } from '../../redux/reducer/catalogReducer';
import { useAppSelector } from '../../store';
import { SortListGroup } from '../../lib/constants';

interface BaseRawProps  {
	open: boolean,
	children?: ReactNode,
	onEditBtnClick: (data: any) => void;
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

interface RawProps extends BaseRawProps {
	openable: boolean, 
	data: any,
	className?: string;
	checkable?: boolean;
	onCheck?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
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

	const hasChildren = Array.isArray(children) && !!children.length

	return <div className={classNames(styles.row, className)}>
		<div className={styles.row_header}>

			<span className={styles.arrow_space}>
				{ openable &&  hasChildren && <span className={styles.toggle_btn} onClick={() => setIsOpen(!isOpen)}>
					{
						isOpen  ? 
							<ArrowUpIcon color="#0040C1" width={16} height={16} /> : 
							<ArrowRightIcon color="#0040C1" width={16} height={16} />  
					}		
				</span>}
			</span>

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
	openModal: (data: Group | Category | Sort, type: SortListGroup) => void
	group?: SortListGroup;
	refetch?: boolean;
}

export const SortsList = ({
	openModal,
	group = SortListGroup.sort,
	refetch = false
}: SortsListProps) =>{

	const search: CatalogState["sortsSearch"] = useAppSelector(selectSortsSearch)
	const [config, setConfig] = useState(defineRawConfig(group))

	const {data, refetch: searchGroups} = useSearchGroupsQuery(search)

	useEffect(() => {
		setConfig(defineRawConfig(group))
	},[group])

	useEffect(() => {
		if(search.search){
			setConfig(defineRawConfig(search.type))
		}
	},[search])

	useEffect(() => {
		if(refetch){
			searchGroups()
		}
	},[refetch, searchGroups])

	return <div className={styles.sorts_list}>
		<div className={styles.header}>
			<input type="checkbox" className={styles.checkbox}/>
			<span className={styles.id}>N°</span>
			<span className={styles.name}>Variedad</span>
		</div>
		
		{data?.map(group => 
			<GroupRaw 
				open={config.group}
				key={`group_${group.id}`} 
				onEditBtnClick={(data: Group | Category | Sort) => openModal(data, SortListGroup.group)}
				group={group}
			>{ group.categories?.map(cat => 
					<CategoryRaw 
						open={config.category}
						key={`category_${cat.id}`} 
						category={cat} 
						onEditBtnClick={(data: Group | Category | Sort) => openModal(data,SortListGroup.category)}>
							{cat.sorts?.map((sort: any) => 
								<SortRaw 
									open={config.sort}
									sort={sort} 
									key={`sort_${sort.id}`} 
									onEditBtnClick={(data: Group | Category | Sort) => openModal(data, SortListGroup.sort)}></SortRaw>
							)}
						</CategoryRaw>
			)}</GroupRaw>
		)}
	</div>
}