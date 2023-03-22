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

#### Edit/Update data row

https://docs.retool.com/docs/working-with-tables#editing-table-values-making-data-editable

- New Query e.g. `article_update`
	- GUI mode
	- Bulk update/upsert via a primary key
	- Primary key: `id`
	- Array of records:
		- All (not used?): `{{ TABLE_NAME.recordUpdates }}`
		- Selected fields (note: need the Primary Key): `{{ TABLE_NAME.recordUpdates.map( row => _.pick(row, ["id", "title", "glam_rating_id"]) ) }}`
	- Refresh list/table: UPDATE_QUERY.success event → LIST_QUERY.trigger()
- Table component:
  - Toggle “Editable” on selected columns
	- Interaction → Event handlers
	- “+Add” button
	- “Save changes” event handler

##### Tag/Dropdown

- Create query/resource for lookup
- Table field → Data source

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
