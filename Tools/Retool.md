# Retool

## Structure

- Account
	- Apps
		- Resources (queries and API requests)
		- Components (UI elements)

## Components and properties

	{{ current_user.firstName || 'friend' }}

- current_user.firstName
- searchBar.value
- table1.selectedRow.data.id

### Data tables

#### Update data row

https://docs.retool.com/docs/working-with-tables#editing-table-values-making-data-editable

- New Query
	- GUI mode
	- Bulk update/upsert via a primary key
	- Primary key: `id`
	- Array of records:
		- All (not used?): `{{ table_name.recordUpdates }}`
		- Selected fields: `{{ table_name.recordUpdates.map( row => _.pick(row, ["id", "title", "glam_rating_id"]) ) }}`
- Table component: Interactions: add Save event handler
- Refresh list/table: UPDATE_QUERY.success event -> trigger LIST_QUERY

##### Tag/Dropdown

- Create query/resource for lookup
- Table field -> Data source

#### Create new row

- Create new Query (GUI mode, Insert a record)
- Table component:
	- Toggle “Show add row button”
	- Interactions: Save new

#### Delete row

- Create new Query (GUI mode, Delete a record)
	- Use magic variable `i` after field name: `{{ product_table.data.id[i] }}`
	- Advanced: Confirmation Modal
- Table: Add new column: Action Button type

### Menu

- If you want to contain multiple screens within an app, you can use a tabbed container.
- You could also try a container with a bunch of buttons that show and hide containers in the app.

https://community.retool.com/t/add-a-side-navigation-bar-with-collapsible-multi-level-menu-items/2405

## Queries

	LIMIT {{ glam_table.pageSize }}
	OFFSET {{ glam_table.paginationOffset }}
