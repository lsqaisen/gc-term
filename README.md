# rc-term

## Use RcTerm
``` jsx
<RcTerm 
    autoResize={ture}
    unitCol={7}
    unitRow={18}
    cols={120}
    rows={24}
    onResize={()=>{}}
    ...termParams/>  
```
* autoResize 是否自适应行列（更具父节点计算）
* unitCol 单元列宽度（px，列为1时的宽度）
* unitRow 单元行宽度（px，行为1时的高度）
* cols 列（可为百分比）
* rows 行（可为百分比）
* onResize 自适应回调
* termParams 其他term参数

## Use WebSocketTerm
```jsx
<WebSocketTerm 
    url={'ws://xxx'}
    splitWrite={false},
    onlyRead={false},
    beforeSendData={[]},
    beforeWriteData={[]},
    termProps={{
        cols: 120,
        rows: 24,
        ...
    }}/>  
```
* url websocket请求地址
* splitWrite 是否将收到的结果以换行符拆分显示
* onlyRead 是否只读（不接受键盘输入）
* beforeSendData 连接成功后立即发送的信息
* beforeWriteData 连接成功后立即显示的信息
* termProps ReTerm参数
