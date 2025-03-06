# JMD INVENTORY 

## USER API
    - register user post
    -- http://localhost:8000/api/v1/user/register
    - login user post
    -- http://localhost:8000/api/v1/user/login
    - logout user route
    -- http://localhost:8000/api/v1/user/logout

## Product API
    - create product (post)
    -- http://localhost:8000/api/v1/product/create
    - fetch all product (get)
    -- http://localhost:8000/api/v1/product/all
    - search by id (get)
    -- http://localhost:8000/api/v1/product/:id
    - update by id (put)
    -- http://localhost:8000/api/v1/product/update/:id
    - delete by id (delete)
    -- http://localhost:8000/api/v1/product/delete/:id
    - download product template (get)
    -- http://localhost:8000/api/v1/product/template
    - upload bulk product (post)
    -- http://localhost:8000/api/v1/product/bulk-upload

## Category API
    - create category (post)
    -- http://localhost:8000/api/v1/category/create
    - create sub category (post)
    -- http://localhost:8000/api/v1/category/create/sub-category
    - fetch all category (get)
    -- http://localhost:8000/api/v1/category/all
    - search by id (get)
    -- http://localhost:8000/api/v1/category/search/:id
    - update by id (put)
    -- http://localhost:8000/api/v1/category/update/:id
    - delete by id (delete)
    -- http://localhost:8000/api/v1/category/delete/:id
    - delete by id (delete)
    -- http://localhost:8000/api/v1/category/delete/:id/sub-category

## Order API
    - create order (post)
    -- http://localhost:8000/api/v1/order/create
    - fetch all order (get)
    -- http://localhost:8000/api/v1/order/all
    - fetch my order (get)
    -- http://localhost:8000/api/v1/order/mine
    - search by id (get)
    -- http://localhost:8000/api/v1/order/search/:id
    - update by id (put)
    -- http://localhost:8000/api/v1/order/update/receive/:id
    - update stock (put)
    -- http://localhost:8000/api/v1/order/updatestock/:id
    - update order deliver (put)
    -- http://localhost:8000/api/v1/order/deliver/procur/:id
    - update order item price (put)
    -- http://localhost:8000/api/v1/order/updateItemPrice/:id
    - delete order by id (delete)
    -- http://localhost:8000/api/v1/order/delete/:id


# Invoice API
    - create invoice (post)
    -- http://localhost:8000/api/v1/invoice/create
    - fetch all invoice (get)
    -- http://localhost:8000/api/v1/invoice/all-invoice
    - fetch last invoice (get)
    -- http://localhost:8000/api/v1/invoice/last-invoice
    - search by id (get)
    -- http://localhost:8000/api/v1/invoice/search/:id
    - update by id (put)
    -- http://localhost:8000/api/v1/invoice/update/:id
 