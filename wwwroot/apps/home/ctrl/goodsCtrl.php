<?php
namespace apps\home\ctrl;
use core\lib\conf;
use apps\home\model\goods;
use apps\home\model\goodsCover;
use apps\home\model\goodsSpecification;
use apps\home\model\discountCoupon;
use apps\home\model\groupGoods;
class goodsCtrl extends baseCtrl{
  public $db;
  public $gcodb;
  public $gsdb;
  public $dcdb;
  public $ggdb;
  public $id;
  public $type;
  // 构造方法
  public function _auto(){
    $this->db = new goods();
    $this->gcodb = new goodsCover();
    $this->gsdb = new goodsSpecification();
    $this->dcdb = new discountCoupon();
    $this->ggdb = new groupGoods();
    $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    $this->type = isset($_GET['type']) ? intval($_GET['type']) : 0;
  }

  // 默认首页
  public function getInfo(){
    // Get
    if (IS_GET === true) {
      $data = $this->db->getInfo($this->id);
      if ($data) {
        // 替换图片完整路径
        $data['content'] = getImgReplaceUrl($data['content'],conf::get('SERVER_NAME','weapp'));
        // 优惠 ？
        $data['discounts'] =  bcsub($data['original_price'], $data['promotion_price'], 2);
        // 请求商品封面图片
        $data['img_path'] = $this->gcodb->getAllCover($this->id);
        // 请求相关商品规格
        $specification = $this->gsdb->getCorrelation($this->id);
        foreach ($specification AS $k => $v) {
          if( $k == 0 ){
            $data['specification'][$k] = array('name'=>$v,'value'=>$v,'checked'=>true);
          }else{
            $data['specification'][$k] = array('name'=>$v,'value'=>$v);
          }
        }
        // type为1时表示拼团商品
        if ($this->type == 1) {
          $data['ggData'] = $this->ggdb->getCorrelation($this->id);
          $data['ggData']['start_time'] = date('Y-m-d H:i',$data['ggData']['start_time']);
          $data['ggData']['end_time'] = date('Y-m-d H:i',$data['ggData']['end_time']);
        } else {
          // 优惠券
          $data['dcData'] = $this->dcdb->getAll();
        }
        echo J(R(200,'',$data));
        die;
      } else {
        echo J(R(400,'',false));
        die;
      }
    }
  }

}