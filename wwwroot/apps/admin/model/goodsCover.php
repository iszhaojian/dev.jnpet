<?php
namespace apps\admin\model;
use core\lib\model;
class goodsCover extends model{
  public $table = 'goods_cover';
  /**
   * 写入数据表
   */
  public function add($gid,$imgPath){
    $this->insert($this->table,array('gid'=>$gid,'img_path'=>$imgPath));
    return $this->id();
  }

  /**
   * 读取相关数据
   */
  public function getCorrelation($gid){
    return $this->select($this->table,'*',['gid'=>$gid]);
  }

  /**
   * 删除数据
   */
  public function del($id){
    $res = $this->delete($this->table,['id'=>$id]);
    return $res->rowCount();
  }

  /**
   * 删除相关数据
   */
  public function delCorrelation($gid){
    $res = $this->delete($this->table,['gid'=>$gid]);
    return $res->rowCount();
  }

}