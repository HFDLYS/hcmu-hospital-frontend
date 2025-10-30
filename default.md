# OpenAPI definition


**简介**:OpenAPI definition


**HOST**:http://localhost:8088


**联系人**:


**Version**:v0


**接口路径**:/v3/api-docs


[TOC]






# 角色接口


## 获取所有角色


**接口地址**:`/roles`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取所有角色</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roleGetRequestDTO||query|true|RoleGetRequestDTO|RoleGetRequestDTO|
|&emsp;&emsp;roleName|||false|string||
|&emsp;&emsp;roleId|||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListRoleListDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||array|RoleListDTO|
|&emsp;&emsp;roleId||integer(int64)||
|&emsp;&emsp;roleName||string||
|&emsp;&emsp;roleInfo||string||
|&emsp;&emsp;isDefault||integer(int32)||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": [
		{
			"roleId": 0,
			"roleName": "",
			"roleInfo": "",
			"isDefault": 0
		}
	]
}
```


## 创建新角色('MASTER_ROLE')


**接口地址**:`/roles`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建新角色</p>



**请求示例**:


```javascript
{
  "roleName": "",
  "roleInfo": "",
  "permissionList": []
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roleCreateDTO|RoleCreateDTO|body|true|RoleCreateDTO|RoleCreateDTO|
|&emsp;&emsp;roleName|||true|string||
|&emsp;&emsp;roleInfo|||true|string||
|&emsp;&emsp;permissionList|||true|array|integer(int64)|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultRoleListDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||RoleListDTO|RoleListDTO|
|&emsp;&emsp;roleId||integer(int64)||
|&emsp;&emsp;roleName||string||
|&emsp;&emsp;roleInfo||string||
|&emsp;&emsp;isDefault||integer(int32)||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {
		"roleId": 0,
		"roleName": "",
		"roleInfo": "",
		"isDefault": 0
	}
}
```


## 更新角色信息('MASTER_ROLE')


**接口地址**:`/roles/{roleId}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>更新角色信息</p>



**请求示例**:


```javascript
{
  "roleName": "",
  "roleInfo": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roleId||path|true|integer(int64)||
|roleUpdateDTO|RoleUpdateDTO|body|true|RoleUpdateDTO|RoleUpdateDTO|
|&emsp;&emsp;roleName|||false|string||
|&emsp;&emsp;roleInfo|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": ""
}
```


## 删除角色('MASTER_ROLE')


**接口地址**:`/roles/{roleId}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>删除角色</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roleId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": ""
}
```


## 获取角色的权限信息('MASTER_ROLE')


**接口地址**:`/roles/{roleId}/permissions`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取角色的权限信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roleId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListPermissionListDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||array|PermissionListDTO|
|&emsp;&emsp;name||string||
|&emsp;&emsp;permissionId||integer(int64)||
|&emsp;&emsp;keyValue|可用值:PERSON_MG_PAGE,ADD_MB,DEL_MB,ALT_MB,CHECK_MB,IMPORT_MB,MASTER_ROLE,LOG_PAGE,DEPART_MG_PAGE,ADD_DEPART,DEL_DEPART,ALT_DEPART,CHECK_DEPART,ADD_DOCTOR,ALT_DOCTOR,DEL_DOCTOR|string||
|&emsp;&emsp;type||integer(int32)||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": [
		{
			"name": "",
			"permissionId": 0,
			"keyValue": "",
			"type": 0
		}
	]
}
```


## 更新角色的权限信息('MASTER_ROLE')


**接口地址**:`/roles/{roleId}/permissions`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>更新角色的权限信息</p>



**请求示例**:


```javascript
[
  {
    "permissionId": 0,
    "isOwn": 0
  }
]
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roleId||path|true|integer(int64)||
|permissionUpdateDTOs|PermissionUpdateDTO|body|true|array|PermissionUpdateDTO|
|&emsp;&emsp;permissionId|||true|integer(int64)||
|&emsp;&emsp;isOwn|||true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": ""
}
```


## 获取所有权限信息('MASTER_ROLE')


**接口地址**:`/roles/permissions`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取所有权限信息</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListPermissionListDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||array|PermissionListDTO|
|&emsp;&emsp;name||string||
|&emsp;&emsp;permissionId||integer(int64)||
|&emsp;&emsp;keyValue|可用值:PERSON_MG_PAGE,ADD_MB,DEL_MB,ALT_MB,CHECK_MB,IMPORT_MB,MASTER_ROLE,LOG_PAGE,DEPART_MG_PAGE,ADD_DEPART,DEL_DEPART,ALT_DEPART,CHECK_DEPART,ADD_DOCTOR,ALT_DOCTOR,DEL_DOCTOR|string||
|&emsp;&emsp;type||integer(int32)||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": [
		{
			"name": "",
			"permissionId": 0,
			"keyValue": "",
			"type": 0
		}
	]
}
```


# 科室接口


## 获取所有科室


**接口地址**:`/departments`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取所有科室</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|requestDTO||query|true|DepartmentGetRequestDTO|DepartmentGetRequestDTO|
|&emsp;&emsp;pageNum|||false|integer(int32)||
|&emsp;&emsp;pageSize|||false|integer(int32)||
|&emsp;&emsp;name|||false|string||
|&emsp;&emsp;parentId|||false|integer(int64)||
|&emsp;&emsp;isDeleted|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultPageDTODepartmentListDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||PageDTODepartmentListDTO|PageDTODepartmentListDTO|
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;list||array|DepartmentListDTO|
|&emsp;&emsp;&emsp;&emsp;departmentId||integer||
|&emsp;&emsp;&emsp;&emsp;name||string||
|&emsp;&emsp;&emsp;&emsp;parentId||integer||
|&emsp;&emsp;&emsp;&emsp;description||string||
|&emsp;&emsp;&emsp;&emsp;location||string||
|&emsp;&emsp;&emsp;&emsp;createTime||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {
		"total": 0,
		"list": [
			{
				"departmentId": 0,
				"name": "",
				"parentId": 0,
				"description": "",
				"location": "",
				"createTime": ""
			}
		]
	}
}
```


## 创建科室('DEPT_MANAGE')


**接口地址**:`/departments`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建科室</p>



**请求示例**:


```javascript
{
  "name": "",
  "parentId": 0,
  "description": "",
  "location": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|departmentCreateDTO|DepartmentCreateDTO|body|true|DepartmentCreateDTO|DepartmentCreateDTO|
|&emsp;&emsp;name|||false|string||
|&emsp;&emsp;parentId|||false|integer(int64)||
|&emsp;&emsp;description|||false|string||
|&emsp;&emsp;location|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultDepartmentListDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||DepartmentListDTO|DepartmentListDTO|
|&emsp;&emsp;departmentId||integer(int64)||
|&emsp;&emsp;name||string||
|&emsp;&emsp;parentId||integer(int64)||
|&emsp;&emsp;description||string||
|&emsp;&emsp;location||string||
|&emsp;&emsp;createTime||string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {
		"departmentId": 0,
		"name": "",
		"parentId": 0,
		"description": "",
		"location": "",
		"createTime": ""
	}
}
```


## 获取科室详情


**接口地址**:`/departments/{departmentId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取科室详情</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|departmentId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultDepartmentListDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||DepartmentListDTO|DepartmentListDTO|
|&emsp;&emsp;departmentId||integer(int64)||
|&emsp;&emsp;name||string||
|&emsp;&emsp;parentId||integer(int64)||
|&emsp;&emsp;description||string||
|&emsp;&emsp;location||string||
|&emsp;&emsp;createTime||string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {
		"departmentId": 0,
		"name": "",
		"parentId": 0,
		"description": "",
		"location": "",
		"createTime": ""
	}
}
```


## 更新科室信息('DEPT_MANAGE')


**接口地址**:`/departments/{departmentId}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>更新科室信息</p>



**请求示例**:


```javascript
{
  "name": "",
  "parentId": 0,
  "description": "",
  "location": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|departmentId||path|true|integer(int64)||
|departmentUpdateDTO|DepartmentUpdateDTO|body|true|DepartmentUpdateDTO|DepartmentUpdateDTO|
|&emsp;&emsp;name|||false|string||
|&emsp;&emsp;parentId|||false|integer(int64)||
|&emsp;&emsp;description|||false|string||
|&emsp;&emsp;location|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": ""
}
```


## 删除科室('DEPT_MANAGE')


**接口地址**:`/departments/{departmentId}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>删除科室（逻辑删除）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|departmentId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": ""
}
```


## 批量删除科室('DEPT_MANAGE')


**接口地址**:`/departments/batch`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>批量删除科室</p>



**请求示例**:


```javascript
[]
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|integers|integer|body|true|array||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": ""
}
```


# 日志接口


## 查找日志('LOG_PAGE')


**接口地址**:`/logs`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>查找日志</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|logGetRequestDTO||query|true|LogGetRequestDTO|LogGetRequestDTO|
|&emsp;&emsp;userName|||false|string||
|&emsp;&emsp;nickname|||false|string||
|&emsp;&emsp;roleName|||false|string||
|&emsp;&emsp;ip|||false|string||
|&emsp;&emsp;operation|||false|string||
|&emsp;&emsp;pageNum|||false|integer(int64)||
|&emsp;&emsp;pageSize|||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultPageDTOLogListDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||PageDTOLogListDTO|PageDTOLogListDTO|
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;list||array|LogListDTO|
|&emsp;&emsp;&emsp;&emsp;logId||integer||
|&emsp;&emsp;&emsp;&emsp;operation||string||
|&emsp;&emsp;&emsp;&emsp;userId||string||
|&emsp;&emsp;&emsp;&emsp;userName||string||
|&emsp;&emsp;&emsp;&emsp;nickname||string||
|&emsp;&emsp;&emsp;&emsp;ip||string||
|&emsp;&emsp;&emsp;&emsp;createTime||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {
		"total": 0,
		"list": [
			{
				"logId": 0,
				"operation": "",
				"userId": "",
				"userName": "",
				"nickname": "",
				"ip": "",
				"createTime": ""
			}
		]
	}
}
```


# 医生档案接口


## 查询医生档案列表


**接口地址**:`/doctor-profiles`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>分页查询医生档案列表</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|requestDTO||query|true|DoctorProfileGetRequestDTO|DoctorProfileGetRequestDTO|
|&emsp;&emsp;pageNum|||false|integer(int32)||
|&emsp;&emsp;pageSize|||false|integer(int32)||
|&emsp;&emsp;departmentId|||false|integer(int64)||
|&emsp;&emsp;title|||false|string||
|&emsp;&emsp;isDeleted|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultPageDTODoctorProfileListDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||PageDTODoctorProfileListDTO|PageDTODoctorProfileListDTO|
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;list||array|DoctorProfileListDTO|
|&emsp;&emsp;&emsp;&emsp;doctorProfileId||integer||
|&emsp;&emsp;&emsp;&emsp;userId||integer||
|&emsp;&emsp;&emsp;&emsp;userName||string||
|&emsp;&emsp;&emsp;&emsp;departmentId||integer||
|&emsp;&emsp;&emsp;&emsp;departmentName||string||
|&emsp;&emsp;&emsp;&emsp;title||string||
|&emsp;&emsp;&emsp;&emsp;specialty||string||
|&emsp;&emsp;&emsp;&emsp;createTime||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {
		"total": 0,
		"list": [
			{
				"doctorProfileId": 0,
				"userId": 0,
				"userName": "",
				"departmentId": 0,
				"departmentName": "",
				"title": "",
				"specialty": "",
				"createTime": ""
			}
		]
	}
}
```


## 创建医生档案('DOCTOR_MANAGE')


**接口地址**:`/doctor-profiles`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建医生档案</p>



**请求示例**:


```javascript
{
  "userId": 0,
  "departmentId": 0,
  "title": "",
  "specialty": "",
  "bio": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|doctorProfileCreateDTO|DoctorProfileCreateDTO|body|true|DoctorProfileCreateDTO|DoctorProfileCreateDTO|
|&emsp;&emsp;userId|||false|integer(int64)||
|&emsp;&emsp;departmentId|||false|integer(int64)||
|&emsp;&emsp;title|||false|string||
|&emsp;&emsp;specialty|||false|string||
|&emsp;&emsp;bio|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultDoctorProfileListDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||DoctorProfileListDTO|DoctorProfileListDTO|
|&emsp;&emsp;doctorProfileId||integer(int64)||
|&emsp;&emsp;userId||integer(int64)||
|&emsp;&emsp;userName||string||
|&emsp;&emsp;departmentId||integer(int64)||
|&emsp;&emsp;departmentName||string||
|&emsp;&emsp;title||string||
|&emsp;&emsp;specialty||string||
|&emsp;&emsp;createTime||string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {
		"doctorProfileId": 0,
		"userId": 0,
		"userName": "",
		"departmentId": 0,
		"departmentName": "",
		"title": "",
		"specialty": "",
		"createTime": ""
	}
}
```


## 获取医生档案详情


**接口地址**:`/doctor-profiles/{doctorProfileId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取医生档案详情</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|doctorProfileId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultDoctorProfileDetailDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||DoctorProfileDetailDTO|DoctorProfileDetailDTO|
|&emsp;&emsp;doctorProfileId||integer(int64)||
|&emsp;&emsp;userId||integer(int64)||
|&emsp;&emsp;userName||string||
|&emsp;&emsp;departmentId||integer(int64)||
|&emsp;&emsp;departmentName||string||
|&emsp;&emsp;title||string||
|&emsp;&emsp;specialty||string||
|&emsp;&emsp;bio||string||
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;updateTime||string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {
		"doctorProfileId": 0,
		"userId": 0,
		"userName": "",
		"departmentId": 0,
		"departmentName": "",
		"title": "",
		"specialty": "",
		"bio": "",
		"createTime": "",
		"updateTime": ""
	}
}
```


## 更新医生档案('DOCTOR_MANAGE')


**接口地址**:`/doctor-profiles/{doctorProfileId}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>更新医生档案信息</p>



**请求示例**:


```javascript
{
  "departmentId": 0,
  "title": "",
  "specialty": "",
  "bio": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|doctorProfileId||path|true|integer(int64)||
|doctorProfileUpdateDTO|DoctorProfileUpdateDTO|body|true|DoctorProfileUpdateDTO|DoctorProfileUpdateDTO|
|&emsp;&emsp;departmentId|||false|integer(int64)||
|&emsp;&emsp;title|||false|string||
|&emsp;&emsp;specialty|||false|string||
|&emsp;&emsp;bio|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": ""
}
```


## 删除医生档案('DOCTOR_MANAGE')


**接口地址**:`/doctor-profiles/{doctorProfileId}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>删除医生档案</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|doctorProfileId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": ""
}
```


## 批量删除医生档案('DOCTOR_MANAGE')


**接口地址**:`/doctor-profiles/batch`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>批量删除医生档案</p>



**请求示例**:


```javascript
[]
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|integers|integer|body|true|array||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": ""
}
```


# 用户登录注册相关接口


## 用户登录


**接口地址**:`/auth/login`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "userName": "",
  "password": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userLoginDTO|UserLoginDTO|body|true|UserLoginDTO|UserLoginDTO|
|&emsp;&emsp;userName|||true|string||
|&emsp;&emsp;password|||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 用户退出


**接口地址**:`/auth/logout/{userId}`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 用户发起注册


**接口地址**:`/auth/register`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户发起注册</p>



**请求示例**:


```javascript
{
  "userName": "",
  "password": "",
  "checkPassword": "",
  "name": "",
  "phone": "",
  "email": "",
  "code": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userRegisterDTO|UserRegisterDTO|body|true|UserRegisterDTO|UserRegisterDTO|
|&emsp;&emsp;userName|||true|string||
|&emsp;&emsp;password|||true|string||
|&emsp;&emsp;checkPassword|||true|string||
|&emsp;&emsp;name|||true|string||
|&emsp;&emsp;phone|||false|string||
|&emsp;&emsp;email|||true|string||
|&emsp;&emsp;code|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 用户注册验证


**接口地址**:`/auth/register/verify`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户注册验证</p>



**请求示例**:


```javascript
{
  "code": "",
  "email": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userEmailVerifyDTO|UserEmailVerifyDTO|body|true|UserEmailVerifyDTO|UserEmailVerifyDTO|
|&emsp;&emsp;code|||false|string||
|&emsp;&emsp;email|||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


# 用户接口


## 获取所有用户的信息


**接口地址**:`/users`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取所有用户的信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userGetRequestDTO||query|true|UserGetRequestDTO|UserGetRequestDTO|
|&emsp;&emsp;userName|||false|string||
|&emsp;&emsp;nickname|||false|string||
|&emsp;&emsp;roleName|||false|string||
|&emsp;&emsp;pageNum|||false|integer(int64)||
|&emsp;&emsp;pageSize|||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultPageDTOUserListDTO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||PageDTOUserListDTO|PageDTOUserListDTO|
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;list||array|UserListDTO|
|&emsp;&emsp;&emsp;&emsp;userId||integer||
|&emsp;&emsp;&emsp;&emsp;userName||string||
|&emsp;&emsp;&emsp;&emsp;name||string||
|&emsp;&emsp;&emsp;&emsp;roleId||string||
|&emsp;&emsp;&emsp;&emsp;roleName||string||
|&emsp;&emsp;&emsp;&emsp;stateId||integer||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {
		"total": 0,
		"list": [
			{
				"userId": 0,
				"userName": "",
				"name": "",
				"roleId": "",
				"roleName": "",
				"stateId": 0
			}
		]
	}
}
```


## 根据个人信息


**接口地址**:`/users/{userId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据个人信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 修改用户信息('ALT_MB') || isSelf


**接口地址**:`/users/{userId}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>修改用户信息</p>



**请求示例**:


```javascript
{
  "phone": "",
  "info": "",
  "nickname": "",
  "sex": "",
  "age": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId||path|true|integer(int64)||
|userUpdateDTO|UserUpdateDTO|body|true|UserUpdateDTO|UserUpdateDTO|
|&emsp;&emsp;phone|||false|string||
|&emsp;&emsp;info|||false|string||
|&emsp;&emsp;nickname|||false|string||
|&emsp;&emsp;sex|||false|string||
|&emsp;&emsp;age|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": ""
}
```


## 设置用户角色('ALT_MB')


**接口地址**:`/users/{userId}/role`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>设置用户角色</p>



**请求示例**:


```javascript
{
  "roleId": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId||path|true|integer(int64)||
|roleUserUpdateDTO|RoleUserUpdateDTO|body|true|RoleUserUpdateDTO|RoleUserUpdateDTO|
|&emsp;&emsp;roleId|||true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": ""
}
```


## 申请重新绑定邮箱


**接口地址**:`/users/email`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>申请重新绑定邮箱</p>



**请求示例**:


```javascript
{
  "code": "",
  "email": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userEmailVerifyDTO|UserEmailVerifyDTO|body|true|UserEmailVerifyDTO|UserEmailVerifyDTO|
|&emsp;&emsp;code|||false|string||
|&emsp;&emsp;email|||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 绑定邮箱验证


**接口地址**:`/users/email/verify`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>绑定邮箱验证</p>



**请求示例**:


```javascript
{
  "code": "",
  "email": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userEmailVerifyDTO|UserEmailVerifyDTO|body|true|UserEmailVerifyDTO|UserEmailVerifyDTO|
|&emsp;&emsp;code|||false|string||
|&emsp;&emsp;email|||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 修改密码


**接口地址**:`/users/password`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "oldPassword": "",
  "newPassword": "",
  "checkPassword": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userPasswordDTO|UserPasswordDTO|body|true|UserPasswordDTO|UserPasswordDTO|
|&emsp;&emsp;oldPassword|||false|string||
|&emsp;&emsp;newPassword|||true|string||
|&emsp;&emsp;checkPassword|||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 获取权限信息


**接口地址**:`/users/permissions`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取权限信息</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```