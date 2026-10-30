import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Box,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  Dice5,
  Gamepad2,
  Heart,
  House,
  RefreshCw,
  Shirt,
  Sparkles,
  Star,
  Utensils,
  WandSparkles,
} from "lucide-react";

type CategoryId = "eat" | "wear" | "play" | "drink" | "home" | "weekend" | "book" | "bookRecommend";
type CategoryIcon = typeof Utensils;

type Choice = {
  title: string;
  subtitle: string;
  detail: string;
  action?: string;
  duration?: string;
  tags: string[];
  dayPlan?: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  bookInfo?: {
    name: string;
    type: string;
    intro: string;
    reason: string;
    style: string;
  };
  palette?: string[];
  outfit?: {
    top: string;
    bottom: string;
    shoes: string;
    accessory: string;
  };
};

type Category = {
  id: CategoryId;
  label: string;
  description: string;
  count: string;
  icon: CategoryIcon;
  tone: string;
  choices: Choice[];
};

const categories: Category[] = [
  {
    id: "eat",
    label: "今天吃什么",
    description: "一口热乎乎的好心情",
    count: "6 个选择",
    icon: Utensils,
    tone: "coral",
    choices: [
      {
        title: "番茄芝士焗饭",
        subtitle: "热乎乎的一人食",
        detail: "米饭铺底，番茄酱拌匀，盖上芝士烤到微焦。懒得开火的话，微波炉也可以。",
        action: "先把芝士放到最上面，幸福会自己融化。",
        duration: "20 分钟",
        tags: ["暖胃", "简单不翻车"],
      },
      {
        title: "照烧鸡腿饭",
        subtitle: "甜咸刚好的满足感",
        detail: "鸡腿排煎到两面金黄，加一勺照烧汁收浓，配一颗溏心蛋和热米饭。",
        action: "先腌 10 分钟，等待是这道饭最难的一步。",
        duration: "25 分钟",
        tags: ["蛋白质", "饱腹"],
      },
      {
        title: "虾仁蔬菜乌冬",
        subtitle: "清爽又有一点点鲜",
        detail: "乌冬、虾仁和喜欢的蔬菜一起下锅，最后淋一圈香油，热腾腾出锅。",
        action: "冰箱里有什么就放什么，不用严格照着菜谱。",
        duration: "15 分钟",
        tags: ["一锅出", "清爽"],
      },
      {
        title: "奶油蘑菇意面",
        subtitle: "给今天加一点柔软",
        detail: "蘑菇炒香后加淡奶油和黑胡椒，拌入意面，撒一点欧芹碎就很像餐厅。",
        action: "黑胡椒多一点，香气会更立体。",
        duration: "20 分钟",
        tags: ["治愈", "仪式感"],
      },
      {
        title: "韩式拌饭",
        subtitle: "五颜六色的一碗",
        detail: "米饭搭配煎蛋、胡萝卜、菠菜和海苔碎，拌上辣酱，一碗就是完整的一餐。",
        action: "先拍照再拌开，颜色好看的时候只有一会儿。",
        duration: "18 分钟",
        tags: ["蔬菜多", "有食欲"],
      },
      {
        title: "酸汤水饺",
        subtitle: "十分钟的热气腾腾",
        detail: "水饺煮熟后放入陈醋、辣椒油、紫菜和葱花，酸香开胃，几乎不需要准备。",
        action: "汤底先调好，饺子一出锅就能直接开吃。",
        duration: "10 分钟",
        tags: ["快手", "热乎"],
      },
    ],
  },
  {
    id: "wear",
    label: "今天穿什么",
    description: "把好看交给配色公式",
    count: "6 个搭配",
    icon: Shirt,
    tone: "lilac",
    choices: [
      {
        title: "奶油白 × 牛仔蓝",
        subtitle: "干净松弛的周末感",
        detail: "低饱和、明亮又耐看，适合去咖啡店、逛展或和朋友散步。",
        palette: ["#FFF8EA", "#7C9CCB", "#B78B66"],
        outfit: { top: "奶油白针织 / T 恤", bottom: "浅蓝直筒牛仔裤", shoes: "米白帆布鞋", accessory: "棕色小方包" },
        action: "把上衣前摆轻轻塞进裤腰，比例立刻变好看。",
        tags: ["显精神", "不挑场合"],
      },
      {
        title: "雾霾蓝 × 燕麦色",
        subtitle: "温柔但不软弱的通勤感",
        detail: "用一件有垂坠感的上装拉出利落线条，颜色安静，照片里也很显质感。",
        palette: ["#9BAFC1", "#DCCBB1", "#4F5B67"],
        outfit: { top: "雾霾蓝衬衫", bottom: "燕麦色阔腿裤", shoes: "深灰乐福鞋", accessory: "银色细项链" },
        action: "袖口挽一折，露出手腕会更轻盈。",
        tags: ["显质感", "通勤友好"],
      },
      {
        title: "樱桃红 × 奶油灰",
        subtitle: "今天也可以有一点主角感",
        detail: "让一件彩色单品做视觉焦点，其余都用中性色托住，醒目但不会用力过猛。",
        palette: ["#B84C58", "#E5E0D8", "#2E3440"],
        outfit: { top: "樱桃红针织开衫", bottom: "奶油灰半身裙", shoes: "黑色玛丽珍鞋", accessory: "小珍珠耳钉" },
        action: "全身只保留一个亮色，其他配饰越简单越高级。",
        tags: ["拍照出片", "一件亮点"],
      },
      {
        title: "橄榄绿 × 沙色",
        subtitle: "自然系的轻户外气质",
        detail: "同样是舒服的宽松版型，配色更有层次，很适合公园、露营或周末短途。",
        palette: ["#7C8D70", "#D6C4A6", "#8A634B"],
        outfit: { top: "橄榄绿短夹克", bottom: "沙色工装裤", shoes: "棕色休闲鞋", accessory: "帆布托特包" },
        action: "把内搭选成白色，能让整体看起来更清爽。",
        tags: ["耐脏实穿", "松弛感"],
      },
      {
        title: "浅黄 × 奶咖棕",
        subtitle: "像阳光一样的轻快配色",
        detail: "浅黄提气色，奶咖压住甜度，适合想穿得明亮一点但又不想太张扬的日子。",
        palette: ["#F4D98B", "#C7AA8D", "#F7F2E9"],
        outfit: { top: "浅黄色短袖衬衫", bottom: "奶咖色A字裙", shoes: "奶油白运动鞋", accessory: "金色耳圈" },
        action: "选择偏暖的金色小配饰，整套会更和谐。",
        tags: ["提气色", "甜而不腻"],
      },
      {
        title: "黑白条纹 × 卡其",
        subtitle: "不用思考也很会穿",
        detail: "经典条纹负责增加层次，卡其色让黑白不显单薄，属于衣柜里最好复刻的公式。",
        palette: ["#F7F5EF", "#252525", "#B89B74"],
        outfit: { top: "黑白条纹上衣", bottom: "高腰卡其裤", shoes: "黑色短靴", accessory: "黑色皮带" },
        action: "记得把腰线露出来，宽松也不会显得拖沓。",
        tags: ["经典耐看", "显比例"],
      },
    ],
  },
  {
    id: "play",
    label: "休息时玩什么",
    description: "给大脑安排一小段快乐",
    count: "6 个活动",
    icon: Gamepad2,
    tone: "mint",
    choices: [
      { title: "城市散步 + 拍三张照片", subtitle: "把无聊走成小旅行", detail: "去一条没认真看过的街，只拍下三样让你停下来的东西。", duration: "45 分钟", action: "现在就穿鞋，走到下一个路口再决定方向。", tags: ["不花钱", "换换空气"] },
      { title: "做一杯冰摇柠檬茶", subtitle: "清醒一下再继续", detail: "柠檬、冰块、红茶和一点点蜂蜜，摇匀之后坐到窗边慢慢喝。", duration: "15 分钟", action: "音乐只放一首，给自己一个有结尾的小休息。", tags: ["动手做", "清爽"] },
      { title: "看一集轻松的剧", subtitle: "允许自己什么也不生产", detail: "选一部看过也不会焦虑的剧，只看一集，配一份喜欢的小零食。", duration: "40 分钟", action: "把手机调成勿扰，放心享受这段被照顾的时间。", tags: ["低能量友好", "即时快乐"] },
      { title: "拼一个 100 片小拼图", subtitle: "让手替大脑休息", detail: "不用追求一次完成，只拼边框和你最喜欢的那一块。", duration: "30 分钟", action: "打开桌面或地板的一小块空地，就算开始。", tags: ["专注", "安静"] },
      { title: "给未来的自己写 5 句话", subtitle: "把心事轻轻放下", detail: "写下今天看见的、感受到的、想感谢的，不用通顺，也不用给别人看。", duration: "10 分钟", action: "最后一句写：今天已经做得够好了。", tags: ["疗愈", "不费力"] },
      { title: "和喜欢的人语音 20 分钟", subtitle: "把快乐分享出去", detail: "不用准备话题，聊聊今天吃了什么、看到什么，或者一起沉默。", duration: "20 分钟", action: "发一句‘现在方便听我碎碎念吗？’就好。", tags: ["有陪伴", "恢复电量"] },
    ],
  },
  {
    id: "drink",
    label: "今天喝什么",
    description: "一点点甜，一点点松弛",
    count: "4 个小配方",
    icon: Coffee,
    tone: "yellow",
    choices: [
      { title: "桂花乌龙气泡水", subtitle: "清爽得像风吹过", detail: "乌龙茶加冰，放两勺桂花蜜，最后补上气泡水。", duration: "5 分钟", action: "杯口加一小片柠檬，香气会更亮。", tags: ["低负担", "有仪式感"] },
      { title: "海盐焦糖拿铁", subtitle: "今天值得被偏爱", detail: "热牛奶、浓缩咖啡和一点海盐焦糖酱，甜度按心情来。", duration: "8 分钟", action: "先喝一口奶泡，再决定要不要加糖。", tags: ["咖啡因", "奖励自己"] },
      { title: "蜂蜜柚子茶", subtitle: "温柔的醒脑方式", detail: "柚子茶酱加温水，搭配两片薄荷叶，适合慢慢喝。", duration: "3 分钟", action: "水温不要太烫，保留柚子的清香。", tags: ["温热", "酸甜"] },
      { title: "草莓酸奶冰", subtitle: "把下午变成粉红色", detail: "草莓、酸奶和少量冰块搅打，顶上撒一把燕麦碎。", duration: "7 分钟", action: "留两颗草莓切片贴在杯壁，视觉满分。", tags: ["高颜值", "有饱足感"] },
    ],
  },
  {
    id: "home",
    label: "今天做点什么",
    description: "把生活收拾成喜欢的样子",
    count: "4 个小任务",
    icon: House,
    tone: "peach",
    choices: [
      { title: "只整理一个抽屉", subtitle: "小小的秩序感", detail: "选一个最容易下手的抽屉，清掉三件不再使用的东西。", duration: "12 分钟", action: "计时结束就停，不需要顺便整理全家。", tags: ["低门槛", "立刻见效"] },
      { title: "换一套床品", subtitle: "今晚会睡得更香", detail: "换上干净床单，顺手把枕头拍松，房间会立刻变得不一样。", duration: "15 分钟", action: "换好之后先坐五分钟，感受一下新鲜空气。", tags: ["提升幸福感", "睡眠友好"] },
      { title: "做一份明天早餐", subtitle: "给明天留一份从容", detail: "准备好鸡蛋、吐司或水果，放进冰箱，早上不用再做决定。", duration: "10 分钟", action: "把早餐放在最容易看见的位置。", tags: ["提前奖励", "省心"] },
      { title: "擦亮一扇窗", subtitle: "让阳光进来一点", detail: "只擦你坐得最近的那扇窗，擦完拉开窗帘就结束。", duration: "8 分钟", action: "播一首喜欢的歌，歌结束，任务也结束。", tags: ["通透", "轻家务"] },
    ],
  },
  {
    id: "weekend",
    label: "周末去哪里",
    description: "从附近开始的小逃离",
    count: "4 个去处",
    icon: Sparkles,
    tone: "blue",
    choices: [
      { title: "去一家没喝过的咖啡店", subtitle: "坐在窗边发会儿呆", detail: "不用跑很远，搜一个评分不错且步行可达的小店。", duration: "1.5 小时", action: "带一本书，但不要求自己真的读完。", tags: ["一人友好", "松弛"] },
      { title: "逛一圈花市", subtitle: "带一小束颜色回家", detail: "选三种喜欢的花材，不用研究名字，凭感觉组合就好。", duration: "1 小时", action: "给自己设一个小预算，快乐也可以很具体。", tags: ["有颜色", "带回家"] },
      { title: "去公园晒太阳", subtitle: "补一点自然电量", detail: "找一张长椅坐下，观察十分钟树影、云和路过的人。", duration: "50 分钟", action: "出门前带水，不用安排更多目的。", tags: ["免费", "回血"] },
      { title: "去书店随机翻三本书", subtitle: "让好奇心选方向", detail: "分别在三个不同区域各拿一本，只读目录和第一段。", duration: "1 小时", action: "最后选最想带走的一本，或一本也不买。", tags: ["灵感", "不赶时间"] },
    ],
  },
  {
    id: "book",
    label: "答案之书",
    description: "给犹豫一个温柔的回声",
    count: "18 个答案",
    icon: BookOpen,
    tone: "violet",
    choices: [
      { title: "现在就开始", subtitle: "答案之书说：别等完美时机", detail: "真正的确定感，往往不是想出来的，而是在行动之后慢慢长出来的。", action: "只做第一步，做完再决定下一步。", tags: ["行动", "破局"] },
      { title: "再等一等", subtitle: "答案之书说：缓慢也是方向", detail: "不是所有停顿都意味着错过，有些答案需要一点时间沉淀成形。", action: "给自己一个明确的等待期限，而不是无限期拖延。", tags: ["耐心", "观察"] },
      { title: "选择更轻松的那个", subtitle: "答案之书说：轻盈不是偷懒", detail: "如果两条路都能抵达，少一点消耗的那条路也值得被认真选择。", action: "问自己：哪一个选择会让我松一口气？", tags: ["减负", "自洽"] },
      { title: "答案在你手里", subtitle: "答案之书说：直觉已经开口", detail: "你反复来问，通常不是因为没有答案，而是想听见别人替你确认。", action: "写下第一反应，不解释，也先不要修改。", tags: ["直觉", "相信自己"] },
      { title: "先照顾好自己", subtitle: "答案之书说：你也是重要的事", detail: "当能量不足时，任何小问题都会看起来很大。恢复电量不是逃避。", action: "先喝水、吃东西、睡一觉，再处理决定。", tags: ["自我照顾", "回血"] },
      { title: "可以拒绝", subtitle: "答案之书说：边界会保护善意", detail: "拒绝一件不适合你的事，不等于你不够善良，只是你也在照顾自己。", action: "用一句简单的‘这次不太方便’，不必写长篇解释。", tags: ["边界", "勇气"] },
      { title: "先做小的", subtitle: "答案之书说：小步也会抵达", detail: "宏大的目标容易让人停在原地，而小动作能让未来变得具体。", action: "把目标缩小到十分钟内能完成的版本。", tags: ["拆解", "开始"] },
      { title: "你没有走错", subtitle: "答案之书说：绕路也算抵达", detail: "有些经历当下看不出意义，但它们正在悄悄改变你看世界的方式。", action: "允许自己暂时看不懂这段路。", tags: ["释怀", "成长"] },
      { title: "说出来会更清楚", subtitle: "答案之书说：语言会整理心绪", detail: "脑海里的念头像缠绕的线，一旦被说出来，通常就会找到自己的顺序。", action: "找一个安全的人，先说五分钟，不急着求建议。", tags: ["表达", "连接"] },
      { title: "保留一点神秘", subtitle: "答案之书说：未知也有礼物", detail: "不是每件事都要提前知道结局，留一点空白，惊喜才有地方发生。", action: "今天故意不查一个答案，去亲自体验。", tags: ["好奇", "松弛"] },
      { title: "回到最初的愿望", subtitle: "答案之书说：别丢掉为什么", detail: "当方法越来越复杂时，重新想起最初想要的东西，方向会变简单。", action: "写下你当初为什么开始，只写一句。", tags: ["初心", "聚焦"] },
      { title: "换个角度再看", subtitle: "答案之书说：距离会带来答案", detail: "同一件事困住你时，改变位置、时间或叙述方式，新的理解可能就出现了。", action: "假装这是朋友的烦恼，你会怎么安慰他？", tags: ["视角", "松动"] },
      { title: "不必让所有人满意", subtitle: "答案之书说：完整比讨好重要", detail: "让每个人都满意是无法完成的任务，真正可持续的是对自己的选择负责。", action: "把‘别人会怎么想’换成‘我愿意承担吗’。", tags: ["做自己", "清醒"] },
      { title: "接受今天的自己", subtitle: "答案之书说：当下已经值得", detail: "你不需要先变得更好，才配拥有休息、快乐和被喜欢的权利。", action: "今天不修正自己，做一件纯粹喜欢的事。", tags: ["接纳", "温柔"] },
      { title: "答案会在路上出现", subtitle: "答案之书说：先走起来", detail: "很多选择不是站在原地就能判断的，需要走几步之后，视野才会打开。", action: "选一个方向走二十分钟，再重新评估。", tags: ["探索", "动态"] },
      { title: "保留你的好奇心", subtitle: "答案之书说：问题也在发光", detail: "暂时没有结论并不可怕，愿意继续提问的人，总会找到新的入口。", action: "把今天最想知道的事记在备忘录里。", tags: ["学习", "灵感"] },
      { title: "值得冒一点小险", subtitle: "答案之书说：勇气可以很小", detail: "勇敢不一定是做惊天动地的事，也可以是发出一条想发很久的消息。", action: "选择一个可撤回、可承受的小冒险。", tags: ["尝试", "心动"] },
      { title: "答案是：会更好的", subtitle: "答案之书说：希望不是空话", detail: "好转不一定轰轰烈烈，有时只是今天比昨天多照顾自己一点。", action: "做一件让明天的你轻松一点的小事。", tags: ["希望", "明天"] },
    ],
  },
  {
    id: "bookRecommend",
    label: "好书推荐",
    description: "让一本书替你打开新世界",
    count: "54 本好书",
    icon: BookMarked,
    tone: "rose",
    choices: [],
  },
];

function combineChoices<T>(items: T[], modifiers: string[], create: (item: T, modifier: string, index: number) => Choice) {
  return items.flatMap((item, itemIndex) => modifiers.map((modifier, modifierIndex) => create(item, modifier, itemIndex * modifiers.length + modifierIndex)));
}

const richCategories: Category[] = categories.map((category) => {
  const generated = (() => {
    if (category.id === "eat") {
      const breakfasts = [
        "小米南瓜粥 + 水煮蛋 + 凉拌黄瓜",
        "鲜肉小笼包 + 紫菜蛋花汤",
        "鲜肉馄饨 + 茶叶蛋 + 小番茄",
        "豆浆 + 鸡蛋灌饼 + 凉拌海带丝",
        "菜肉包 + 玉米 + 无糖豆浆",
        "葱油拌面 + 荷包蛋 + 凉拌木耳",
      ];
      const lunches = [
        "米饭 + 青椒肉丝 + 蒜蓉西兰花",
        "米饭 + 番茄炒蛋 + 香菇青菜",
        "米饭 + 土豆烧鸡 + 凉拌黄瓜",
        "米饭 + 虾仁滑蛋 + 清炒小白菜",
        "牛肉面 + 凉拌三丝",
        "炸酱面 + 拌豆芽 + 紫菜汤",
        "米饭 + 鱼香肉丝 + 蒜蓉菠菜",
        "米饭 + 香煎豆腐 + 芹菜炒肉",
        "鸡丝凉面 + 凉拌毛豆 + 番茄汤",
      ];
      const dinners = [
        "米饭 + 清蒸鲈鱼 + 蚝油生菜",
        "米饭 + 京酱肉丝 + 手撕包菜",
        "米饭 + 香菇滑鸡 + 蒜泥茄子",
        "番茄鸡蛋面 + 凉拌菠菜",
        "刀削面 + 凉拌海带丝 + 卤鸡蛋",
        "米饭 + 可乐鸡翅 + 清炒油麦菜",
        "米饭 + 芹菜牛肉 + 清炒豆苗",
        "酸汤面 + 凉拌鸡丝 + 蒜香西兰花",
        "米饭 + 家常豆腐 + 清炒娃娃菜",
      ];
      const styles = ["家常均衡", "清爽不腻", "暖胃满足", "下班省心", "周末丰盛", "想吃中式", "荤素刚好", "简单开饭", "给自己加菜"];
      return Array.from({ length: 54 }, (_, index) => {
        const breakfast = breakfasts[index % breakfasts.length];
        const lunch = lunches[(index * 2) % lunches.length];
        const dinner = dinners[(index * 4 + 1) % dinners.length];
        const style = styles[index % styles.length];
        return {
          title: `今日三餐 · ${style} ${String(index + 1).padStart(2, "0")}`,
          subtitle: "一次拆出完整的一日菜单",
          detail: `早餐吃${breakfast}；午餐吃${lunch}；晚餐吃${dinner}。一日三餐有主食、有蛋白质，也有蔬菜和凉菜，照着买菜就能执行。`,
          action: index % 2 ? "早餐简单一点，午餐吃饱，晚餐把口味收清淡一些。" : "可以先准备晚餐的肉类，再顺手把第二天早餐的食材放到最前面。",
          duration: "一整天的三餐安排",
          tags: [style, "早午晚都有"],
          dayPlan: { breakfast, lunch, dinner },
        };
      });
    }
    if (category.id === "wear") {
      const looks = [
        { name: "奶油白针织", top: "奶油白针织", bottom: "浅蓝直筒牛仔裤", shoes: "米白帆布鞋", accessory: "棕色小方包", palette: ["#FFF8EA", "#7C9CCB", "#B78B66"] },
        { name: "雾霾蓝衬衫", top: "雾霾蓝衬衫", bottom: "燕麦色阔腿裤", shoes: "深灰乐福鞋", accessory: "银色细项链", palette: ["#9BAFC1", "#DCCBB1", "#4F5B67"] },
        { name: "樱桃红开衫", top: "樱桃红针织开衫", bottom: "奶油灰半身裙", shoes: "黑色玛丽珍鞋", accessory: "小珍珠耳钉", palette: ["#B84C58", "#E5E0D8", "#2E3440"] },
        { name: "橄榄绿夹克", top: "橄榄绿短夹克", bottom: "沙色工装裤", shoes: "棕色休闲鞋", accessory: "帆布托特包", palette: ["#7C8D70", "#D6C4A6", "#8A634B"] },
        { name: "浅黄衬衫", top: "浅黄色短袖衬衫", bottom: "奶咖色A字裙", shoes: "奶油白运动鞋", accessory: "金色耳圈", palette: ["#F4D98B", "#C7AA8D", "#F7F2E9"] },
        { name: "黑白条纹", top: "黑白条纹上衣", bottom: "高腰卡其裤", shoes: "黑色短靴", accessory: "黑色皮带", palette: ["#F7F5EF", "#252525", "#B89B74"] },
        { name: "雾粉西装", top: "雾粉色短西装", bottom: "白色直筒裤", shoes: "裸色低跟鞋", accessory: "小号链条包", palette: ["#E8B7B9", "#FCF8F0", "#B98C86"] },
        { name: "海盐蓝卫衣", top: "海盐蓝宽松卫衣", bottom: "深灰运动长裙", shoes: "灰白跑鞋", accessory: "奶油色棒球帽", palette: ["#B5D0DD", "#62666B", "#EDE4D5"] },
        { name: "焦糖棕风衣", top: "焦糖棕短风衣", bottom: "深蓝九分裤", shoes: "酒红色短靴", accessory: "格纹围巾", palette: ["#B77F53", "#31445E", "#75473F"] },
      ];
      const occasions = ["去咖啡店", "轻松通勤", "周末散步", "约会见面", "看展拍照", "雨天出门"];
      return combineChoices(looks, occasions, (look, occasion, index) => ({
        title: `${look.name} · ${occasion}`,
        subtitle: "今日配色公式",
        detail: `用${look.name}做主角，适合${occasion}。上下装保持一个明亮、一个沉稳，整体会松弛又有比例。`,
        action: index % 2 ? "把配饰控制在一到两件，颜色就会更干净。" : "露出一点脚踝或手腕，整套会更轻盈。",
        tags: ["好看好抄", index % 2 ? "有层次" : "显比例"],
        palette: look.palette,
        outfit: { top: look.top, bottom: look.bottom, shoes: look.shoes, accessory: look.accessory },
      }));
    }
    if (category.id === "play") {
      const activities = ["城市散步", "做一杯饮料", "看一集轻松的剧", "拼一幅小拼图", "整理照片", "听一张专辑", "去菜市场逛逛", "做十分钟拉伸", "给朋友发语音"];
      const moods = ["想换换空气", "只剩一点电量", "需要安静下来", "想找回灵感", "想要被陪伴", "想奖励自己"];
      return combineChoices(activities, moods, (activity, mood, index) => ({
        title: `${activity} · ${mood}`,
        subtitle: "给自己安排一小段快乐",
        detail: `今天用${activity}回应“${mood}”。不需要做得完整，只要让注意力从原来的地方轻轻挪开。`,
        action: index % 2 ? "设置一个结束时间，休息也可以有边界。" : "先做五分钟，想继续就继续，不想也算完成。",
        duration: `${10 + (index % 6) * 10} 分钟`,
        tags: ["低门槛", index % 2 ? "换频道" : "小快乐"],
      }));
    }
    if (category.id === "drink") {
      const drinks = ["桂花乌龙气泡水", "海盐焦糖拿铁", "蜂蜜柚子茶", "草莓酸奶冰", "青提茉莉冰茶", "可可燕麦奶", "柠檬薄荷水", "黑糖姜奶", "芒果酸奶杯"];
      const moments = ["早起慢慢醒", "午后提提神", "下班奖励自己", "读书配一杯", "宅家看剧时", "想喝点清爽的"];
      return combineChoices(drinks, moments, (drink, moment, index) => ({
        title: `${drink} · ${moment}`,
        subtitle: "今天的杯子里有一点好运",
        detail: `${drink}适合“${moment}”。不用把配方做得很专业，准备一个喜欢的杯子就已经很有仪式感。`,
        action: index % 2 ? "先做半杯试味道，喜欢再续上。" : "加一片水果或一颗冰块，让今天看起来更漂亮。",
        duration: `${3 + (index % 5)} 分钟`,
        tags: ["小配方", index % 2 ? "清爽" : "有仪式感"],
      }));
    }
    if (category.id === "home") {
      const tasks = ["整理一个抽屉", "换一套床品", "做一份明天早餐", "擦亮一扇窗", "给植物浇水", "清空一个购物车", "把衣服分好类", "整理手机相册", "洗好明天要穿的衣服"];
      const versions = ["只做十分钟", "配一首歌完成", "从最小的一角开始", "顺便给自己放水", "完成后立刻休息", "邀请未来的自己帮忙"];
      return combineChoices(tasks, versions, (task, version, index) => ({
        title: `${task} · ${version}`,
        subtitle: "给生活留一点清爽",
        detail: `今天只做“${task}”，方式是“${version}”。小范围的整理也算把生活重新握回手里。`,
        action: index % 2 ? "计时结束就停，不要把一个小任务升级成大工程。" : "完成后拍一张照片，留住这份小小的秩序感。",
        duration: `${8 + (index % 5) * 4} 分钟`,
        tags: ["轻家务", index % 2 ? "立刻见效" : "低门槛"],
      }));
    }
    if (category.id === "weekend") {
      const places = ["没喝过的咖啡店", "附近的花市", "城市公园", "街角书店", "一条旧街", "周边小展览", "河边步道", "社区菜市场", "郊外小车站"];
      const routes = ["坐在窗边发会儿呆", "带一束颜色回家", "晒一会儿太阳", "随机翻三本书", "拍三张照片", "给自己买份小甜点"];
      return combineChoices(places, routes, (place, route, index) => ({
        title: `${place} · ${route}`,
        subtitle: "从附近开始的小逃离",
        detail: `去${place}，然后${route}。不需要把一天排满，让途中发生的小事成为计划的一部分。`,
        action: index % 2 ? "只设一个目的，其他时间留给偶遇。" : "出门前带水和充满电的手机，轻装就很好。",
        duration: `${40 + (index % 5) * 15} 分钟`,
        tags: ["周末友好", index % 2 ? "慢一点" : "有灵感"],
      }));
    }
    if (category.id === "bookRecommend") {
      const books = [
        { name: "《活着》", type: "中国当代文学", intro: "一个普通人穿过漫长岁月，在命运起伏里努力活下来的故事。", reason: "如果你想读一本克制却很有力量的书，它会让‘活着’这个词重新变得具体。" },
        { name: "《额尔古纳河右岸》", type: "民族文学 / 生命史诗", intro: "一位鄂温克族女性的自述，写森林、迁徙、亲情与一个族群的缓慢变迁。", reason: "文字像林间的风，适合想读得安静一点、又想看见辽阔世界的时候。" },
        { name: "《长安的荔枝》", type: "历史小说", intro: "一个小人物接下几乎不可能完成的差事，在唐代长安与岭南之间奔波。", reason: "节奏轻快、细节鲜活，适合想读历史但不想面对厚重门槛的人。" },
        { name: "《云边有个小卖部》", type: "当代小说", intro: "少年在小镇、亲情与成长之间来回寻找，最后理解了家与爱。", reason: "像一封写给故乡的信，适合需要一点温柔和眼泪的晚上。" },
        { name: "《一句顶一万句》", type: "中国当代文学", intro: "几代普通人在孤独与寻找知音的路上彼此错过，又彼此照见。", reason: "它写的是日常人的心事，适合想读复杂人情、又喜欢慢慢回味的人。" },
        { name: "《小王子》", type: "童话 / 哲思", intro: "一位来自小行星的小王子，在星际旅行中遇见关于爱、责任和孤独的答案。", reason: "薄薄一本却能在不同年龄读出不同层次，适合想被温柔提醒的人。" },
        { name: "《解忧杂货店》", type: "治愈小说", intro: "一间神奇的杂货店收到来自过去与未来的信，陌生人的命运因此互相连接。", reason: "每个故事都像一次轻轻的回应，适合需要相信人与人仍能彼此照亮的时候。" },
        { name: "《挪威的森林》", type: "青春文学", intro: "青年人在爱、失去与成长之间摸索，寻找与世界相处的方式。", reason: "适合想读一点含蓄、忧伤又有青春气息的情感故事。" },
        { name: "《月亮与六便士》", type: "经典小说", intro: "一个中年人突然放弃原有生活，追逐心中关于绘画与自由的召唤。", reason: "它不替你判断选择对错，只把‘想过另一种人生’这件事摆到面前。" },
        { name: "《杀死一只知更鸟》", type: "成长 / 社会小说", intro: "孩子从家庭与社区的事件中，第一次理解偏见、正义和勇气。", reason: "叙事温柔但问题锋利，适合想读一部有故事也有思考的作品。" },
        { name: "《1984》", type: "反乌托邦小说", intro: "在被监视与改写语言的世界里，一个人试图守住自己的记忆和思想。", reason: "适合想读设定有冲击力、读完会继续思考现实的作品。" },
        { name: "《百年孤独》", type: "魔幻现实主义", intro: "布恩迪亚家族七代人的兴衰，在一个小镇里折射时间、欲望与孤独。", reason: "适合愿意沉浸在奇异而浓烈的文字里，慢慢建立阅读地图的人。" },
        { name: "《人类简史》", type: "历史 / 人类学", intro: "从认知革命、农业革命到科技革命，梳理人类如何合作并塑造世界。", reason: "适合想把‘我们为什么成为今天的我们’看得更远、更大的时候。" },
        { name: "《万历十五年》", type: "历史随笔", intro: "以明万历十五年为切口，观察制度、人物性格与时代如何互相牵制。", reason: "适合喜欢从细节理解历史，不满足于简单人物评价的读者。" },
        { name: "《置身事内》", type: "经济 / 社会观察", intro: "从地方政府与经济运行的角度，解释许多日常生活背后的制度逻辑。", reason: "适合想把新闻、城市和身边的变化看得更明白的人。" },
        { name: "《蛤蟆先生去看心理医生》", type: "心理成长", intro: "一只陷入低落的蛤蟆，在咨询关系中逐渐认识情绪、关系与自己。", reason: "语言简单但很有共鸣，适合第一次接触心理学或正在整理自己的时候。" },
        { name: "《被讨厌的勇气》", type: "心理 / 哲学对话", intro: "通过一场青年与哲人的对话，讨论自由、课题分离与如何活出自己的生活。", reason: "适合总在意别人目光、想重新找回行动感的读者。" },
        { name: "《我与地坛》", type: "散文 / 生命书写", intro: "作者在地坛与岁月相处，写残疾、母亲、死亡，也写活着的细小光亮。", reason: "适合需要安静下来，与自己的生命经验重新相处的时候。" },
      ];
      const styles = ["温柔入门", "沉浸式阅读", "值得反复回看"];
      return combineChoices(books, styles, (book, style) => ({
        title: `${book.name} · ${style}`,
        subtitle: book.type,
        detail: book.intro,
        action: book.reason,
        tags: [book.type, style],
        bookInfo: { name: book.name, type: book.type, intro: book.intro, reason: book.reason, style },
      }));
    }
    const answers = ["现在就开始", "再等一等", "选择更轻松的那个", "答案在你手里", "先照顾好自己", "可以拒绝", "先做小的", "你没有走错", "保留一点神秘"];
    const angles = ["别等完美时机", "缓慢也是方向", "轻盈不是偷懒", "直觉已经开口", "你也是重要的事", "边界会保护善意"];
    return combineChoices(answers, angles, (answer, angle, index) => ({
      title: `${answer} · ${angle}`,
      subtitle: `答案之书说：${answer}`,
      detail: `有时，${angle}。这不是一条需要立刻证明的结论，而是一枚可以放在心里、慢慢验证的小提示。`,
      action: index % 2 ? "把这句话写进备忘录，今天找一个时刻试试看。" : "先做一个最小动作，让答案从想法变成经验。",
      tags: ["今日提示", index % 2 ? "慢慢验证" : "温柔坚定"],
    }));
  })();
  const choices = category.id === "eat" ? generated : [...category.choices, ...generated];
  return { ...category, count: `${choices.length} ${category.count.replace(/^\d+\s*/, "")}`, choices };
});

const categoryTone = {
  coral: "tone-coral",
  lilac: "tone-lilac",
  mint: "tone-mint",
  yellow: "tone-yellow",
  peach: "tone-peach",
  blue: "tone-blue",
  violet: "tone-violet",
  rose: "tone-rose",
};

export default function Home() {
  const [selectedId, setSelectedId] = useState<CategoryId>("eat");
  const [result, setResult] = useState<Choice | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [usedChoices, setUsedChoices] = useState<Record<CategoryId, string[]>>({
    eat: [],
    wear: [],
    play: [],
    drink: [],
    home: [],
    weekend: [],
    book: [],
    bookRecommend: [],
  });

  const selectedCategory = useMemo(
    () => richCategories.find((category) => category.id === selectedId) ?? richCategories[0],
    [selectedId],
  );

  const selectCategory = (id: CategoryId) => {
    setSelectedId(id);
    setResult(null);
    setIsFavorite(false);
    setCopied(false);
  };

  const drawBox = () => {
    if (isShaking) return;
    setIsShaking(true);
    setIsFavorite(false);
    setCopied(false);
    window.setTimeout(() => {
      const pool = selectedCategory.choices;
      const used = usedChoices[selectedCategory.id] ?? [];
      const fresh = pool.filter((choice) => !used.includes(choice.title));
      const source = fresh.length > 0 ? fresh : pool;
      const withoutCurrent = result ? source.filter((choice) => choice.title !== result.title) : source;
      const candidates = withoutCurrent.length > 0 ? withoutCurrent : source;
      const next = candidates[Math.floor(Math.random() * candidates.length)] ?? pool[0];
      setResult(next);
      setUsedChoices((previous) => ({
        ...previous,
        [selectedCategory.id]: fresh.length > 0 ? [...(previous[selectedCategory.id] ?? []), next.title] : [next.title],
      }));
      setIsShaking(false);
    }, 720);
  };

  const copyResult = async () => {
    if (!result) return;
    const resultText = result.bookInfo
      ? `书名：${result.bookInfo.name}\n类型：${result.bookInfo.type}\n简介：${result.bookInfo.intro}\n推荐理由：${result.bookInfo.reason}`
      : result.dayPlan
      ? `早餐：${result.dayPlan.breakfast}\n午餐：${result.dayPlan.lunch}\n晚餐：${result.dayPlan.dinner}`
      : result.outfit
      ? `上装：${result.outfit.top}；下装：${result.outfit.bottom}；鞋履：${result.outfit.shoes}；配饰：${result.outfit.accessory}`
      : result.detail;
    try {
      await navigator.clipboard.writeText(`${result.title}\n${resultText}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="app-shell">
      <div className="paper-grain" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="/" aria-label="返回拆盲盒首页">
          <span className="brand-mark"><Box size={19} strokeWidth={2.6} /></span>
          <span className="brand-name">拆盲盒</span>
          <span className="brand-dot">·</span>
          <span className="brand-subtitle">日常选择研究所</span>
        </a>
        <div className="topbar-note"><span className="mini-sparkle">✦</span> 今天也会有好事发生</div>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> DECISION, BUT MAKE IT FUN</div>
          <h1>今天的选择，<br /><em>交给好运气。</em></h1>
          <p className="hero-description">不知道吃什么、穿什么，或者休息时做点什么？<br />拆一颗，轻松一点。答案会自己跳出来。</p>
          <div className="hero-proof"><div className="proof-avatars"><span>🍓</span><span>🧸</span><span>🌼</span></div><span>已经有 <strong>2,849</strong> 个选择困难者拆过了</span></div>
        </div>
        <div className="hero-box-wrap" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="float-star star-one">✦</span>
          <span className="float-star star-two">✷</span>
          <div className={`hero-box ${isShaking ? "is-shaking" : ""}`}>
            <div className="box-ribbon vertical" />
            <div className="box-lid"><span className="lid-label">OPEN<br /><b>ME</b></span></div>
            <div className="box-body"><div className="box-tape" /><span>?</span></div>
            <div className="box-shadow" />
          </div>
        </div>
      </section>

      <section className="workbench" aria-label="盲盒选择区">
        <div className="section-kicker"><span>01</span><span className="kicker-rule" /><span>先选一个今天的小难题</span></div>
        <div className="category-layout">
          <div className="category-panel">
            <div className="category-heading"><div><h2>你想把什么交给盲盒？</h2><p>不用想太久，第一直觉通常很准。</p></div><span className="tiny-note">tap to choose <ArrowRight size={15} /></span></div>
            <div className="category-list">
              {richCategories.map((category, index) => {
                const Icon = category.icon;
                const isSelected = selectedId === category.id;
                return (
                  <button
                    key={category.id}
                    className={`category-card ${isSelected ? "is-selected" : ""} ${categoryTone[category.tone as keyof typeof categoryTone]}`}
                    onClick={() => selectCategory(category.id)}
                    aria-pressed={isSelected}
                  >
                    <span className="category-index">0{index + 1}</span>
                    <span className="category-icon"><Icon size={22} strokeWidth={2.2} /></span>
                    <span className="category-copy"><strong>{category.label}</strong><small>{category.description}</small></span>
                    <span className="category-count">{category.count}</span>
                    <ChevronRight className="category-arrow" size={19} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="draw-panel">
            <div className="selected-label"><span className="selected-dot" /> 当前选择 · {selectedCategory.label}</div>
            <button className={`draw-card ${isShaking ? "is-shaking" : ""}`} onClick={drawBox} disabled={isShaking} aria-label={`拆开${selectedCategory.label}盲盒`}>
              <span className="draw-card-top"><span>READY TO OPEN</span><span>{isShaking ? "OPENING..." : "NO PEEKING"}</span></span>
              <span className="draw-gift"><Dice5 size={27} strokeWidth={1.8} /></span>
              <strong>{isShaking ? "盲盒正在摇晃…" : result ? "再拆一次" : "拆盲盒"}</strong>
              <span>{isShaking ? "答案马上就到" : result ? "换一个答案，没关系的" : "把选择交给一点点随机"}</span>
              <span className="draw-card-bottom"><span>点击开启</span><WandSparkles size={16} /></span>
            </button>
            <p className="draw-hint"><Sparkles size={14} /> 每次拆到的答案都不一样，直到遇到“就是它”</p>
          </div>
        </div>
      </section>

      <section className={`result-section ${result ? "has-result" : ""}`} aria-live="polite">
        <div className="section-kicker"><span>02</span><span className="kicker-rule" /><span>{result ? "好运气已送达" : "盒子里会有什么"}</span></div>
        {!result ? (
          <div className="empty-result">
            <div className="empty-doodle"><span>?</span><div className="doodle-sparkle">✦</div></div>
            <div><h2>你的答案正在盒子里打盹</h2><p>选一个主题，再点击上面的盲盒。<br />不用完美决定，先让今天有一个开始。</p></div>
            <div className="empty-arrow"><ArrowRight size={20} /></div>
          </div>
        ) : (
          <div className={`result-card ${categoryTone[selectedCategory.tone as keyof typeof categoryTone]}`}>
            <div className="result-topline"><span className="result-stamp"><Star size={13} fill="currentColor" /> 今日盲盒结果</span><span className="result-number">NO. {String(selectedCategory.choices.findIndex((item) => item.title === result.title) + 1).padStart(2, "0")}</span></div>
            <div className="result-main">
              <div className="result-title-block"><p className="result-eyebrow">{result.bookInfo ? "今日好书推荐" : result.subtitle}</p><h2>{result.bookInfo?.name ?? result.title}</h2><p className="result-detail">{result.bookInfo ? "让一本书替你打开一个新的世界。" : result.detail}</p></div>
              <div className="result-actions"><button className={`icon-button ${isFavorite ? "is-favorite" : ""}`} onClick={() => setIsFavorite(!isFavorite)} aria-label={isFavorite ? "取消收藏" : "收藏这个结果"}><Heart size={20} fill={isFavorite ? "currentColor" : "none"} /></button><button className="icon-button" onClick={copyResult} aria-label="复制结果">{copied ? <Check size={20} /> : <span className="copy-icon">⤴</span>}</button></div>
            </div>
            {result.bookInfo ? (
              <div className="book-result">
                <div className="book-meta-row"><span className="book-type-pill">{result.bookInfo.type}</span><span className="book-style-note">阅读气质 · {result.bookInfo.style}</span></div>
                <div className="book-info-block"><small>内容简介</small><p>{result.bookInfo.intro}</p></div>
                <div className="book-info-block reason-block"><small>推荐理由</small><p>{result.bookInfo.reason}</p></div>
              </div>
            ) : result.dayPlan ? (
              <div className="day-plan">
                <div className="day-plan-heading"><span>今日三餐</span><small>一拆就是完整的一天</small></div>
                <div className="day-plan-row"><span className="meal-label breakfast-label">早餐</span><strong>{result.dayPlan.breakfast}</strong></div>
                <div className="day-plan-row"><span className="meal-label lunch-label">午餐</span><strong>{result.dayPlan.lunch}</strong></div>
                <div className="day-plan-row"><span className="meal-label dinner-label">晚餐</span><strong>{result.dayPlan.dinner}</strong></div>
              </div>
            ) : result.outfit ? (
              <div className="outfit-result">
                <div className="palette-row"><span>今日配色</span><div className="palette-swatches">{result.palette?.map((color) => <span key={color} style={{ backgroundColor: color }} />)}</div><span className="palette-code">SOFT &amp; EASY</span></div>
                <div className="outfit-grid">
                  <div><small>上装</small><strong>{result.outfit.top}</strong></div><div><small>下装</small><strong>{result.outfit.bottom}</strong></div><div><small>鞋履</small><strong>{result.outfit.shoes}</strong></div><div><small>配饰</small><strong>{result.outfit.accessory}</strong></div>
                </div>
              </div>
            ) : (
              <div className="detail-callout"><span className="callout-icon"><Clock3 size={17} /></span><div><small>{result.duration ? `建议留给自己 ${result.duration}` : "小小提示"}</small><strong>{result.action}</strong></div></div>
            )}
            <div className="result-footer"><div className="tag-list">{result.tags.map((tag) => <span key={tag}># {tag}</span>)}</div><button className="another-button" onClick={drawBox}><RefreshCw size={15} /> 再拆一次</button></div>
          </div>
        )}
      </section>

      <footer className="footer"><span>Designed for indecisive but lovely people.</span><span className="footer-heart">♥</span><span>每一个答案，都只是一个可爱的开始。</span></footer>
    </main>
  );
}
