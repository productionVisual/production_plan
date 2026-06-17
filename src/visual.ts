// @ts-nocheck
// v3.7.45: AppSource license manager — strict model (Desktop + Service).
// Edit mode without an active license = editor UI locked + trial banner.
// View mode = always rendered, no license check.
const VALID_PLAN_IDS = [
    "plan_trial",
    "plan_monthly",
    "plan_annual",
    "plan_tenant_annual",
    "plan_reference_partner"
];
const APPSOURCE_OFFER_URL =
    "https://appsource.microsoft.com/product/power-bi-visuals/productionvisual.production-plan?tab=Overview";

const SHIFT_TEMPLATES = [
    { label_hu: "5/2 nyolc óra (8h)", label_en: "5/2 eight hours (8h)", minutes: 480, shifts: 2, workDays: 5 },
    { label_hu: "5/3 nyolc óra (8h)", label_en: "5/3 eight hours (8h)", minutes: 480, shifts: 3, workDays: 5 },
    { label_hu: "5/3 tizenkét óra (12h)", label_en: "5/3 twelve hours (12h)", minutes: 720, shifts: 3, workDays: 5 },
    { label_hu: "4/2 nyolc óra (8h)", label_en: "4/2 eight hours (8h)", minutes: 480, shifts: 2, workDays: 4 },
    { label_hu: "4/2 tizenkét óra (12h)", label_en: "4/2 twelve hours (12h)", minutes: 720, shifts: 2, workDays: 4 },
    { label_hu: "6/2 nyolc óra (8h)", label_en: "6/2 eight hours (8h)", minutes: 480, shifts: 2, workDays: 6 },
    { label_hu: "6/2 tizenkét óra (12h)", label_en: "6/2 twelve hours (12h)", minutes: 720, shifts: 2, workDays: 6 },
    { label_hu: "2/2 nyolc óra (8h)", label_en: "2/2 eight hours (8h)", minutes: 480, shifts: 2, workDays: 7 },
    { label_hu: "2/2 tizenkét óra (12h)", label_en: "2/2 twelve hours (12h)", minutes: 720, shifts: 2, workDays: 7 },
    { label_hu: "Folyamatos nyolc óra (8h)", label_en: "Continuous eight hours (8h)", minutes: 480, shifts: 3, workDays: 7 },
    { label_hu: "Folyamatos tizenkét óra (12h)", label_en: "Continuous twelve hours (12h)", minutes: 720, shifts: 2, workDays: 7 },
    { label_hu: "Egyedi", label_en: "Custom", minutes: 0, shifts: 0, workDays: 5 }
];

const PLANNED_STOPS = [
    { label_hu: "Ebédszünet", label_en: "Lunch break", defaultMinutes: 30 },
    { label_hu: "Reggeli szünet", label_en: "Morning break", defaultMinutes: 10 },
    { label_hu: "Délutáni szünet", label_en: "Afternoon break", defaultMinutes: 10 },
    { label_hu: "Műszakváltás", label_en: "Shift change", defaultMinutes: 15 },
    { label_hu: "Tervezett karbantartás", label_en: "Planned maintenance", defaultMinutes: 0 },
    { label_hu: "Egyéb tervezett állás", label_en: "Other planned stop", defaultMinutes: 0 }
];

const TRANSLATIONS = {
    en: {
        title: "Production Plan",
        addArea: "Add Area",
        areaType: "Area Type",
        customName: "Name",
        before: "Previous",
        after: "Next",
        save: "Save",
        cancel: "Cancel",
        none: "None",
        delete: "Delete",
        edit: "Edit",
        production: "Production",
        quality: "Quality",
        buffer: "Buffer",
        nameRequired: "Enter a name",
        emptyTitle: "No areas yet",
        emptySubtitle: "Create your first production area to get started",
        type: "Type",
        name: "Name",
        flow: "Flow",
        contentPlaceholder: "This area's content will be configured in later steps",
        shiftSchedule: "Shift Schedule",
        plannedStops: "Planned Stops",
        summary: "Summary",
        shift: "Shift",
        shiftCount: "Number of shifts",
        min: "min",
        baseOpenTime: "Base Open Time",
        totalPlannedStop: "Total planned stop",
        noLinkedAreas: "No linked areas",
        shiftAndStops: "Shift Schedule & Planned Stops",
        consolidationThreshold: "Consolidation threshold",
        consolidationThresholdHint: "Aggressiveness of small-remainder consolidation. 100 = always try to merge a leftover onto a sister machine that already runs the same product (subject to target capacity). Lower values only move genuinely small fragments. 0 = off.",
        themeLight: "Light",
        themeDark: "Dark",
        collapse: "Collapse",
        expand: "Expand",
        logistics: "Delivery & Goals",
        close: "Close",
        addProduct: "Add Product",
        productName: "Product Name",
        goalThisWeek: "Goal This Week",
        goalNextWeek: "Goal Next Week",
        deliveryQty: "Delivery Qty",
        deliveryDate: "Delivery Date",
        totalGoal: "Total Goal",
        delivered: "Delivered",
        remaining: "Remaining",
        pcs: "pcs",
        noProducts: "No products yet",
        noProductsSub: "Add your first product to set delivery goals",
        product: "Product",
        editProduct: "Edit Product",
        currentWeek: "Current Week",
        nextWeek: "Next Week",
        weekNum: "Week",
        producedQty: "Produced",
        setGoals: "Set Goals",
        noDataProducts: "Drag Product Name, Week Number and Produced Quantity columns into the visual",
        deliveryGoal: "Delivery Goal",
        bufferGoal: "Buffer Goal",
        overflow: "Overflow to next week",
        summaryTile: "Weekly Summary",
        totalWeekGoal: "Total Week Goal",
        totalProduced: "Total Produced",
        fulfilled: "Fulfilled",
        products: "products",
        machines: "Machines",
        addMachine: "Add Machine",
        selectMachine: "Select Machine",
        cycleTime: "Cycle Time (min)",
        noMachines: "No machines added yet",
        noMachinesSub: "Add machines to this production area",
        machineAlready: "Already added",
        removeMachine: "Remove",
        noMachineData: "Drag Machine Name and Cycle Time columns into the visual",
        singleAdd: "Single",
        bulkAdd: "Bulk Add",
        bulkHint: "Paste machine names (one per line, or comma/semicolon separated)",
        machineKindReal: "Real machine (from data)",
        machineKindVirtual: "Virtual machine (custom name)",
        virtualMachineName: "Virtual machine name",
        virtualMachineNameHint: "E.g. \"SP-1 Pinion\". Must be unique within this area.",
        cycleTimeAlias: "Base machine for cycle times",
        cycleTimeAliasHint: "Look up cycle times under this machine's name (so you don't have to change the data).",
        machineGroupKey: "Machine group",
        machineGroupKeyHint: "Machines sharing this label are forced to produce products with matching bind-key value (e.g. SP-1 Pinion + SP-1 Ring both run TL2=220 in the same shift).",
        machineGroupBindKey: "Bind by",
        machineGroupNone: "No group",
        quickSelectByLevel: "Quick select by type level",
        quickSelectHint: "Click a value to toggle all products at that level.",
        quickTL1: "TL1",
        quickTL2: "TL2",
        quickTL3: "TL3",
        pufferData: "Puffer Data",
        selectPufferCol: "Select puffer column",
        noPufferData: "No puffer data available",
        noPufferDataSub: "Drag Puffer Data columns into the visual",
        pufferQty: "Quantity",
        productionPlan: "Production Plan",
        pipelinePos: "Pipeline",
        daysAhead: "days ahead",
        shiftOffset: "Shift offset",
        shiftsAhead: "shift(s) ahead",
        needed: "Needed",
        dailyCap: "Daily cap",
        noPlan: "No plan available",
        noPlanSub: "Add machines and set delivery goals to generate a plan",
        legend: "Legend",
        nextWeekWork: "Next week",
        thisWeekView: "This Week",
        nextWeekView: "Next Week",
        priority: "Priority",
        deliveryPriority: "Delivery",
        goalPriority: "Goal",
        curWeekDelivery: "This wk delivery",
        curWeekGoal: "This wk goal",
        nxtWeekDelivery: "Next wk delivery",
        nxtWeekGoal: "Next wk goal",
        showPlanPage: "View Production Plan",
        backToArea: "Back",
        machineDowntime: "Machine Availability",
        plannedMaint: "Planned Stop",
        breakdown: "Breakdown",
        allShifts: "All Shifts",
        available: "Available",
        unavailable: "Unavailable",
        setDowntime: "Set Downtime",
        downtimeReason: "Reason",
        machineOff: "OFF",
        noDowntime: "No downtime set",
        allowedProducts: "Allowed Products",
        allProducts: "All products",
        configProducts: "Configure Products",
        productCapability: "Product Capability",
        productRouting: "Product Routing",
        productRoutingHint: "When this area has multiple downstream connections, choose which downstream each product goes to.",
        defaultRoute: "Default (chain follower)",
        productRoutingTitle: "Product → Downstream",
        configRouting: "Configure routing",
        routingCount: "set",
        noRouting: "Default for all",
        routingGroupBy: "Split by",
        routingGroupNone: "Individual products",
        parallelLanes: "Parallel products",
        parallelLanesHint: "How many products can this machine produce simultaneously?",
        sameParentLanes: "Same parent product",
        sameParentLanesHint: "Lanes must belong to the same parent product (e.g. pinion + ring of the same gear set)",
        groupBy: "Group lanes by",
        groupByNone: "None (any product)",
        groupByParent: "Parent product",
        groupByTL1: "Type Level 1",
        groupByTL2: "Type Level 2",
        groupByTL3: "Type Level 3",
        validatedFor: "Validated for",
        pipelineMap: "Pipeline Map",
        ganttView: "Gantt",
        ganttSub: "Per-product schedule timeline for the selected area — shift by shift.",
        backToMap: "Back to Map",
        mapView: "Map",
        listView: "List",
        shiftsOffset: "shifts offset",
        machineCount: "machines",
        bufferStock: "Buffer",
        qualityProducts: "Quality Products",
        addQualityProduct: "Add Product",
        qualityCycleTime: "Inspection Time (min)",
        noQualityProducts: "No products configured",
        noQualityProductsSub: "Add products to define inspection times for this quality area",
        selectProduct: "Select Product",
        qualityStation: "Quality Station",
        inspectionTime: "Inspection",
        removeProduct: "Remove",
        supplyWarning: "Supply risk",
        supplyWarningTip: "Upstream capacity + buffer may not cover demand",
        onlineProduction: "Online prod. likely",
        supplyGap: "Gap",
        needed: "Needed",
        licenseRequired: "Editor license required",
        licenseDescription: "Viewers always see the visual for free. Only editors need a license to change settings.",
        startTrial: "Start 30-day free trial"
    },
    hu: {
        title: "Production Plan",
        addArea: "Terület Hozzáadása",
        areaType: "Terület Típusa",
        customName: "Név",
        before: "Előző",
        after: "Következő",
        save: "Mentés",
        cancel: "Mégse",
        none: "Nincs",
        delete: "Törlés",
        edit: "Szerkesztés",
        production: "Gyártás",
        quality: "Minőség",
        buffer: "Puffer",
        nameRequired: "Adj meg egy nevet",
        emptyTitle: "Még nincsenek területek",
        emptySubtitle: "Hozd létre az első területet a kezdéshez",
        type: "Típus",
        name: "Név",
        flow: "Folyamat",
        contentPlaceholder: "A terület tartalma a későbbi lépésekben lesz konfigurálva",
        shiftSchedule: "Műszakrend",
        plannedStops: "Tervezett állások",
        summary: "Összesítés",
        shift: "Műszak",
        shiftCount: "Műszakok száma",
        min: "perc",
        baseOpenTime: "Alap Open Time",
        totalPlannedStop: "Össz. tervezett állás",
        noLinkedAreas: "Nincs kapcsolt terület",
        shiftAndStops: "Műszakrend & Tervezett állások",
        consolidationThreshold: "Konszolidálási küszöb",
        consolidationThresholdHint: "A kis-maradék konszolidálás agresszivitása. 100 = mindig próbálkozzon: egy maradék áthelyezése egy másik gépre, amelyiken ugyanaz a termék már fut (cél-gép kapacitás-check mellett). Alacsonyabb érték csak valóban kicsi fragmenteket mozgat. 0 = ki.",
        themeLight: "Világos",
        themeDark: "Sötét",
        collapse: "Összecsukás",
        expand: "Kibontás",
        logistics: "Kiszállítás és célok",
        close: "Bezárás",
        addProduct: "Termék hozzáadása",
        productName: "Termék neve",
        goalThisWeek: "Cél ezen a héten",
        goalNextWeek: "Cél következő héten",
        deliveryQty: "Kiszállítási darabszám",
        deliveryDate: "Kiszállítási dátum",
        totalGoal: "Összes cél",
        delivered: "Kiszállított",
        remaining: "Hátralévő",
        pcs: "db",
        noProducts: "Még nincsenek termékek",
        noProductsSub: "Add hozzá az első terméket a kiszállítási célok beállításához",
        product: "Termék",
        editProduct: "Termék szerkesztése",
        currentWeek: "Aktuális hét",
        nextWeek: "Következő hét",
        weekNum: "Hét",
        producedQty: "Legyártott",
        setGoals: "Célok beállítása",
        noDataProducts: "Húzd be a Termék neve, Hét száma és Legyártott mennyiség oszlopokat a vizualizációba",
        deliveryGoal: "Kiszállítási cél",
        bufferGoal: "Puffer cél",
        overflow: "Többlet a következő hétre",
        summaryTile: "Heti összesítés",
        totalWeekGoal: "Össz. heti cél",
        totalProduced: "Össz. legyártott",
        fulfilled: "Teljesítve",
        products: "termék",
        machines: "Gépek",
        addMachine: "Gép hozzáadása",
        selectMachine: "Válassz gépet",
        cycleTime: "Ciklusidő (perc)",
        noMachines: "Még nincsenek gépek",
        noMachinesSub: "Adj hozzá gépeket ehhez a gyártási területhez",
        machineAlready: "Már hozzáadva",
        removeMachine: "Eltávolítás",
        noMachineData: "Húzd be a Gép neve és Ciklusidő oszlopokat a vizualizációba",
        singleAdd: "Egyedi",
        bulkAdd: "Tömeges",
        bulkHint: "Illeszd be a gépneveket (soronként, vesszővel vagy pontosvesszővel elválasztva)",
        machineKindReal: "Valódi gép (adatból)",
        machineKindVirtual: "Virtuális gép (egyedi név)",
        virtualMachineName: "Virtuális gép neve",
        virtualMachineNameHint: "Pl. „SP-1 Pinion\". Egyedinek kell lennie a területen belül.",
        cycleTimeAlias: "Alap gép a ciklusidőkhöz",
        cycleTimeAliasHint: "Innen veszi a ciklusidőket (így nem kell módosítani az adatforrást).",
        machineGroupKey: "Gép csoport",
        machineGroupKeyHint: "Az ugyanezzel a címkével rendelkező gépeknek a kötési kulcs azonos értékét kell gyártaniuk (pl. SP-1 Pinion + SP-1 Ring is TL2=220 ugyanabban a műszakban).",
        machineGroupBindKey: "Kötési kulcs",
        machineGroupNone: "Nincs csoport",
        quickSelectByLevel: "Gyors választás típusszint szerint",
        quickSelectHint: "Kattints egy értékre, hogy egyszerre be/kikapcsold az adott szint összes termékét.",
        quickTL1: "TL1",
        quickTL2: "TL2",
        quickTL3: "TL3",
        pufferData: "Puffer adatok",
        selectPufferCol: "Válassz puffer oszlopot",
        noPufferData: "Nincs puffer adat",
        noPufferDataSub: "Húzd be a Puffer adat oszlopokat a vizualizációba",
        pufferQty: "Mennyiség",
        productionPlan: "Production Plan",
        pipelinePos: "Pipeline",
        daysAhead: "nap előny",
        shiftOffset: "Műszak eltolás",
        shiftsAhead: "műszak előny",
        needed: "Szükséges",
        dailyCap: "Napi kap.",
        noPlan: "Nincs elérhető terv",
        noPlanSub: "Adj hozzá gépeket és állíts be kiszállítási célokat",
        legend: "Jelmagyarázat",
        nextWeekWork: "Következő hét",
        thisWeekView: "Ez a hét",
        nextWeekView: "Következő hét",
        priority: "Prioritás",
        deliveryPriority: "Kiszállítás",
        goalPriority: "Cél",
        curWeekDelivery: "E heti kiszállítás",
        curWeekGoal: "E heti cél",
        nxtWeekDelivery: "Jövő heti kiszállítás",
        nxtWeekGoal: "Jövő heti cél",
        showPlanPage: "Termelési terv megtekintése",
        backToArea: "Vissza",
        machineDowntime: "Gép elérhetőség",
        plannedMaint: "Tervezett állás",
        breakdown: "Géphiba",
        allShifts: "Összes műszak",
        available: "Elérhető",
        unavailable: "Nem elérhető",
        setDowntime: "Állásidő beállítása",
        downtimeReason: "Ok",
        machineOff: "KI",
        noDowntime: "Nincs állásidő beállítva",
        allowedProducts: "Gyártható termékek",
        allProducts: "Minden termék",
        configProducts: "Termékek beállítása",
        productCapability: "Termék validáció",
        productRouting: "Termék útvonal",
        productRoutingHint: "Ha a területnek több downstream kapcsolata van, megadhatod, hogy melyik termék melyik downstream területre kerül.",
        defaultRoute: "Alapértelmezett (lánc szerint)",
        productRoutingTitle: "Termék → Downstream",
        configRouting: "Útvonal beállítása",
        routingCount: "beállítva",
        noRouting: "Mind alapértelmezett",
        routingGroupBy: "Szétosztás",
        routingGroupNone: "Termékenként",
        parallelLanes: "Párhuzamos termékek",
        parallelLanesHint: "Hány terméket tud egyszerre gyártani ez a gép?",
        sameParentLanes: "Azonos parent termék",
        sameParentLanesHint: "A párhuzamos termékek ugyanahhoz a parent termékhez kell tartozzanak (pl. ugyanazon gear set pinion + ring)",
        groupBy: "Lane csoportosítás",
        groupByNone: "Nincs (bármely termék)",
        groupByParent: "Parent termék",
        groupByTL1: "Type Level 1",
        groupByTL2: "Type Level 2",
        groupByTL3: "Type Level 3",
        validatedFor: "Validálva",
        pipelineMap: "Pipeline térkép",
        ganttView: "Gantt",
        ganttSub: "Termékenkénti ütemterv az adott területre — műszakról műszakra.",
        backToMap: "Vissza a térképre",
        mapView: "Térkép",
        listView: "Lista",
        shiftsOffset: "műszak eltolás",
        machineCount: "gép",
        bufferStock: "Puffer",
        qualityProducts: "Minőségellenőrzési termékek",
        addQualityProduct: "Termék hozzáadása",
        qualityCycleTime: "Ellenőrzési idő (perc)",
        noQualityProducts: "Nincs beállított termék",
        noQualityProductsSub: "Adj hozzá termékeket az ellenőrzési idők beállításához",
        selectProduct: "Válassz terméket",
        qualityStation: "Minőségellenőrzés",
        inspectionTime: "Ellenőrzés",
        removeProduct: "Eltávolítás",
        supplyWarning: "Ellátási kockázat",
        supplyWarningTip: "Az upstream kapacitás + puffer nem biztos, hogy fedezi az igényt",
        onlineProduction: "Online gyártás valószínű",
        supplyGap: "Hiány",
        licenseRequired: "Szerkesztői licenc szükséges",
        licenseDescription: "A nézők mindig ingyen látják a vizuált. Csak a szerkesztőknek kell licenc a beállítások módosításához.",
        startTrial: "30 napos ingyenes próba indítása"
    },
};

const THEMES = {
    dark: {
        bg: "#0d1117", fg: "#e6edf3", fgMuted: "#8b949e",
        surface: "#161b22", surfaceHover: "#1c2129",
        border: "#30363d", accent: "#388bfd",
        accentSoft: "rgba(56,139,253,0.15)",
        purple: "#bc8cff", purpleSoft: "rgba(188,140,255,0.15)",
        amber: "#e3b341", amberSoft: "rgba(227,179,65,0.15)",
        green: "#56d364", greenSoft: "rgba(86,211,100,0.12)",
        red: "#ff7b72", redSoft: "rgba(255,123,114,0.15)",
        shadow: "0 1px 3px rgba(0,0,0,0.4)",
        shadowLg: "0 12px 40px rgba(0,0,0,0.5)"
    },
    light: {
        bg: "#f6f8fa", fg: "#1f2328", fgMuted: "#656d76",
        surface: "#ffffff", surfaceHover: "#f3f4f6",
        border: "#d8dee4", accent: "#0969da",
        accentSoft: "rgba(9,105,218,0.1)",
        purple: "#8250df", purpleSoft: "rgba(130,80,223,0.1)",
        amber: "#bf8700", amberSoft: "rgba(191,135,0,0.1)",
        green: "#1a7f37", greenSoft: "rgba(26,127,55,0.1)",
        red: "#cf222e", redSoft: "rgba(207,34,46,0.1)",
        shadow: "0 1px 3px rgba(0,0,0,0.08)",
        shadowLg: "0 12px 40px rgba(0,0,0,0.12)"
    }
};

// v3.7.21 / v3.7.24 / v3.7.25: dual product-color palettes, indexed
// identically so the same product gets the same "slot" across themes —
// only the hex changes.
// v3.7.25: bumped from 14 to 20 slots AND reordered with a max-distance
// permutation. Each hue is 18° apart on the wheel (20×18=360°), but the
// SLOT order is a 7-step rotation of the wheel, so consecutive slots are
// ~126° apart — every neighbouring slot is a completely different region
// of the color wheel (slot 0=red, slot 1=green, slot 2=blue-violet, slot
// 3=red-orange…). Combined with the v3.7.25 sequential-allocation index
// (see _buildFamilyColorRegistry), the first 20 alphabetically-ordered
// families get 20 maximally-distinct hues with no collision — fixing
// the "GS18/GS19/GS20 all look kék" cluster from v3.7.24.
// LIGHT palette is the medium-dark Primer-style scale picked for >= 4.5:1
// contrast against #ffffff so labels stay readable in light mode.
const PLAN_COLORS_DARK = [
    "#ff7b72",  // slot 0  =   0° red
    "#56d364",  // slot 1  = 126° green
    "#8e88ff",  // slot 2  = 252° blue-violet
    "#ff8c5c",  // slot 3  =  18° red-orange
    "#3ed09a",  // slot 4  = 144° green-teal
    "#bc8cff",  // slot 5  = 270° purple
    "#ff9d4e",  // slot 6  =  36° orange
    "#3ad2a5",  // slot 7  = 162° teal
    "#d28cff",  // slot 8  = 288° purple-magenta
    "#ecbe3f",  // slot 9  =  54° amber
    "#4dcfde",  // slot 10 = 180° cyan
    "#e08cff",  // slot 11 = 306° magenta
    "#d8d544",  // slot 12 =  72° yellow
    "#5fc4f0",  // slot 13 = 198° sky-cyan
    "#f08ce0",  // slot 14 = 324° pink-magenta
    "#b4d04d",  // slot 15 =  90° yellow-green
    "#79c0ff",  // slot 16 = 216° sky-blue
    "#ff7eb6",  // slot 17 = 342° pink-red
    "#7ee787",  // slot 18 = 108° light green
    "#5e9aff"   // slot 19 = 234° blue
];
const PLAN_COLORS_LIGHT = [
    "#cf222e",  // slot 0  =   0° red
    "#1a7f37",  // slot 1  = 126° green
    "#4040c4",  // slot 2  = 252° blue-violet
    "#c63d18",  // slot 3  =  18° red-orange
    "#007856",  // slot 4  = 144° green-teal
    "#8250df",  // slot 5  = 270° purple
    "#bd5a00",  // slot 6  =  36° orange
    "#00786a",  // slot 7  = 162° teal
    "#9c2cbf",  // slot 8  = 288° purple-magenta
    "#a76700",  // slot 9  =  54° amber
    "#006d80",  // slot 10 = 180° cyan
    "#a8259c",  // slot 11 = 306° magenta
    "#8c7200",  // slot 12 =  72° yellow-olive
    "#006090",  // slot 13 = 198° sky-cyan
    "#ad287d",  // slot 14 = 324° pink-magenta
    "#6f7d00",  // slot 15 =  90° olive-green
    "#0550ae",  // slot 16 = 216° sky-blue
    "#b53a55",  // slot 17 = 342° pink-red
    "#4e7a1a",  // slot 18 = 108° lime-green
    "#0969da"   // slot 19 = 234° blue
];

const ICON_CLOSE = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
const ICON_TRASH = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>';
const ICON_ARROW = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const ICON_CHEVRON_DOWN = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
const ICON_CHEVRON_RIGHT = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>';
const ICON_WARNING = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';

export class Visual {
    target;
    host;
    theme = "dark";
    language = "en";
    areas = [];
    dataProducts = [];
    dataMachines = [];
    dataPuffers = [];
    cycleTimeMap = {};
    productGoals = {};
    productGoalsUser = {};      // manually-entered goals/deliveries (persisted, used when data roles are not bound)
    _goalBoundInData = false;   // true if goalQty data role is bound
    _deliveryBoundInData = false; // true if deliveryQty OR deliveryDate data role is bound
    productTypeMap = {};
    productTypeLevelMap = {};
    bomMap = {};
    currentWeekNum = 0;
    nextWeekNum = 0;
    selectedAreaId = "__logistics__";
    modalOverlay = null;
    isPersisting = false;
    shiftSectionCollapsed = false;
    // v3.7.45: AppSource license state (async — checked once per session)
    hasValidLicense = false;
    licenseChecked = false;
    licensePromise = null;
    selectionManager = null;
    tooltipService = null;
    events = null;              // v3.7.47: IVisualEventService — Rendering Events API (for Power BI certification)
    productSelectionIds = {};

    constructor(options) {
        if (!options) throw new Error("Visual constructor options required");
        this.host = options.host;
        this.target = options.element;
        this.target.style.overflow = "hidden";
        this.target.style.width = "100%";
        this.target.style.height = "100%";
        // v3.7.45: AppSource cert 1180.2.5 — right-click must show Power BI's
        // context menu (Export data, Show as table, etc.). We attach at the
        // visual root so right-clicks anywhere in the visual surface trigger
        // showContextMenu with a visual-scope selectionId ({}).
        this.selectionManager = this.host.createSelectionManager();
        // v3.7.45: tooltipService for hover tooltips (AppSource cert 1180.2.2.2)
        this.tooltipService = this.host && this.host.tooltipService;
        // v3.7.47: Rendering Events API (renderingStarted/Finished/Failed) — required
        // for the Power BI "Certified" badge so AppSource stops showing the generic
        // "Can access external services" capability note (the visual makes no external calls).
        this.events = this.host && this.host.eventService;
        this.target.addEventListener("contextmenu", (ev) => {
            if (ev.defaultPrevented) return;
            ev.preventDefault();
            this.selectionManager.showContextMenu({}, { x: ev.clientX, y: ev.clientY });
        });
        this.autoDetectWeeks();
        this.render();
    }

    autoDetectWeeks() {
        // Always calculate the real current week from today's date
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const w1 = new Date(d.getFullYear(), 0, 4);
        const realWeekNum = 1 + Math.round(((d.getTime() - w1.getTime()) / 86400000 - 3 + (w1.getDay() + 6) % 7) / 7);

        if (this.currentWeekNum === 0) {
            // First time: just set it
            this.currentWeekNum = realWeekNum;
            this.nextWeekNum = realWeekNum >= 52 ? 1 : realWeekNum + 1;
        } else if (realWeekNum !== this.currentWeekNum) {
            // Week has changed — just update the numbers; goals/deliveries come from the data table
            this.currentWeekNum = realWeekNum;
            this.nextWeekNum = realWeekNum >= 52 ? 1 : realWeekNum + 1;
            this.saveState();
        }
    }

    // v3.7.45: AppSource license check. Runs once per session; result cached for
    // the lifetime of the visual. Failures default to "no license" (strict).
    startLicenseCheck() {
        if (this.licensePromise) return;
        const lm = this.host && this.host.licenseManager;
        if (!lm || typeof lm.getAvailableServicePlans !== "function") {
            this.licenseChecked = true;
            this.hasValidLicense = false;
            return;
        }
        this.licensePromise = Promise.resolve(lm.getAvailableServicePlans()).then(
            (result) => {
                const plans = (result && result.plans) || [];
                this.hasValidLicense = plans.some(
                    (p) => {
                        if (!p) { return false; }
                        // state is a numeric enum at runtime (Active=1, Warning=2) — both are usable licenses.
                        const stateOk = p.state === 1 || p.state === 2 || p.state === "Active" || p.state === "Warning";
                        // spIdentifier is the Partner Center GENERATED Service ID
                        // (e.g. "<publisher>.<offer>.<planId>"), not the bare plan ID — match on the planId part.
                        const sp = String(p.spIdentifier || "");
                        return stateOk && VALID_PLAN_IDS.some((id) => sp.indexOf(id) >= 0);
                    }
                );
                this.licenseChecked = true;
                try { this.render(); } catch (_e) {}
            },
            () => {
                this.hasValidLicense = false;
                this.licenseChecked = true;
                try { this.render(); } catch (_e) {}
            }
        );
    }

    // Editors can change settings only if they have an active license.
    canEdit() {
        return this.isEditMode && this.hasValidLicense;
    }

    // Banner shown in Edit mode when no active license is found.
    buildLicenseBanner(th) {
        const banner = this.el("div",
            "display:flex;align-items:center;gap:12px;padding:10px 14px;" +
            "background:linear-gradient(90deg,#2a1f08,#1a1408);" +
            "border-bottom:2px solid #6b4a1a;color:#ffd87a;font-size:13px;flex-shrink:0;");
        const icon = this.el("span", "font-size:18px;flex-shrink:0;");
        icon.textContent = "🔒";  // 🔒
        banner.appendChild(icon);
        const text = this.el("span", "flex:1;");
        const lang = this.language || "en";
        const t = (key) => (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
        const strong = this.el("strong", "color:#ffe9a8;margin-right:6px;");
        strong.textContent = t("licenseRequired") + ".";
        text.appendChild(strong);
        text.appendChild(document.createTextNode(" " + t("licenseDescription")));
        banner.appendChild(text);
        const link = document.createElement("a");
        link.href = APPSOURCE_OFFER_URL;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = t("startTrial");
        link.style.cssText =
            "flex-shrink:0;padding:6px 14px;background:#ffb84d;color:#1a1408;" +
            "border-radius:4px;text-decoration:none;font-weight:600;";
        banner.appendChild(link);
        return banner;
    }

    update(options) {
        if (this.isPersisting) return;
        if (this.events) this.events.renderingStarted(options);   // v3.7.47: Rendering Events (cert)
        // v3.3.51: track Power BI report edit mode so destructive
        // actions (e.g. deleting an area from the tab bar) are only
        // available to report authors — not to consumers in view mode.
        try {
            // powerbi.ViewMode: View=0, Edit=1, InFocusEdit=2
            this.isEditMode = !!(options && (options.viewMode === 1 || options.viewMode === 2));
        } catch (e) { this.isEditMode = false; }
        this.startLicenseCheck();  // v3.7.45
        try {
            if (options?.dataViews?.[0]?.metadata?.objects) {
                this.restoreFromDataView(options.dataViews[0]);
            }
            this.readDataProducts(options);
        } catch (e) {
            this._diagLastError = String(e && e.message || e);
        }
        // v3.7.23 / v3.7.25: bomMap may have just been rebuilt by
        // readDataProducts — drop the cached product colors AND the family→
        // slot registry so they recompute against the fresh family set.
        this._productColorCache = {};
        this._familyColorRegistry = null;
        this.autoDetectWeeks();
        try {
            this.render();
        } catch (e) {
            this._diagLastError = String(e && e.message || e);
            if (this.events) this.events.renderingFailed(options, (e && e.message) ? e.message : String(e));   // v3.7.47
            return;
        }
        // v3.3.75: chain-diagnostic overlay re-enabled to debug last-area detection.
        // v3.7.18: chain-diag overlay (the green-bordered "[v3.5.1 same-week
        // drain] click X to dismiss" popup top-right) HIDDEN per user request.
        // The _renderChainDiagOverlay() helper stays in the bundle for future
        // re-enable. We still:
        //   - remove any stale overlay left over from a prior build, so the
        //     popup doesn't linger across visual reloads;
        //   - trigger _calculateAreaPlan for all chain areas so _diagPlanInfo
        //     stays populated (other code paths still read it).
        try {
            const _stale = document.getElementById("__prodplan_diag_overlay__");
            if (_stale && _stale.parentNode) _stale.parentNode.removeChild(_stale);
            this._diagPlanInfo = { chain: [], areas: {} };
            try {
                for (const _a of (this.areas || [])) {
                    if (_a && _a.machines && _a.machines.length > 0) {
                        try { this._calculateAreaPlan(_a); } catch (_pe) {}
                    }
                }
            } catch (_de) {}
            // Overlay render call intentionally omitted (see comment above).
        } catch (_e) {}

        // v3.3.13: Paged data loading via fetchMoreData.
        // When Machine Name is bound together with Goal/Delivery, the PBI-generated
        // SUMMARIZECOLUMNS cross-joins Machine × Date × CycleTime → row counts can
        // exceed the per-segment 30,000-row limit (observed: 118,384 rows).
        // The fetchMoreData(true) call tells PBI: "I want all segments merged — call
        // update() once more when everything is available." Without this, late-date
        // deliveries (e.g. 2026-04-24) get dropped from the returned rows.
        try {
            const _dvs = options?.dataViews || [];
            for (let _i = 0; _i < _dvs.length; _i++) {
                const _seg = _dvs[_i] && _dvs[_i].metadata && _dvs[_i].metadata.segment;
                if (_seg && this.host && typeof this.host.fetchMoreData === "function") {
                    this.host.fetchMoreData(true);
                    break;
                }
            }
        } catch (e) {}
        if (this.events) this.events.renderingFinished(options);   // v3.7.47: Rendering Events (cert)
    }

    readDataProducts(options) {
        this.dataProducts = [];
        this.dataMachines = [];
        this.dataPuffers = [];
        // Hybrid model: start from user-entered goals/deliveries (persisted). Bound data will override per-field below.
        this.productGoals = {};
        for (const _pn in (this.productGoalsUser || {})) {
            const _u = this.productGoalsUser[_pn] || {};
            this.productGoals[_pn] = {
                goalByWeek: Object.assign({}, _u.goalByWeek || {}),
                deliveries: Array.isArray(_u.deliveries) ? _u.deliveries.map(d => ({ qty: d.qty, date: d.date })) : []
            };
        }
        this._goalBoundInData = false;
        this._deliveryBoundInData = false;
        this._bindingWarnings = []; // v3.3.10: collected binding smell-detect warnings
        this.cycleTimeMap = {};
        this.productTypeMap = {};
        this.productTypeLevelMap = {};
        this.bomMap = {};
        try {
            const dvs = options?.dataViews || [];
            if (dvs.length === 0) return;

            // --- Helpers ---
            // v3.3.11: TZ-robust date formatting.
            // Power BI can pass date values as (a) Date objects at UTC midnight,
            // (b) Date objects at local midnight (epoch = prev-day 22:00Z in CEST),
            // or (c) ISO strings like "2026-04-20T22:00:00.000Z".
            // Custom-visual iframes may run in UTC regardless of host TZ, so using
            // local components (getFullYear/getMonth/getDate) or naively slicing the
            // ISO string can produce a 1-day shift (e.g. 04-21 -> 04-20).
            // Fix: add 12h in UTC space ("noon-shift") so any value within ±12h of
            // the intended calendar day maps back to that day via UTC components.
            const _toIsoDate = (v) => {
                if (!v) return "";
                const _fmt = (dt) => {
                    const noon = new Date(dt.getTime() + 12 * 3600 * 1000);
                    const y = noon.getUTCFullYear();
                    const m = String(noon.getUTCMonth() + 1).padStart(2, '0');
                    const d = String(noon.getUTCDate()).padStart(2, '0');
                    return y + '-' + m + '-' + d;
                };
                if (v instanceof Date) return isNaN(v.getTime()) ? "" : _fmt(v);
                const s = String(v);
                // Plain date-only string (no time component) — trust as-is
                const plainMatch = s.match(/^(\d{4}-\d{2}-\d{2})$/);
                if (plainMatch) return plainMatch[1];
                // Anything with a time component — parse and noon-shift
                const d = new Date(s);
                return isNaN(d.getTime()) ? "" : _fmt(d);
            };
            // --- HARD WEEK FILTER ---
            const _curWk = this.currentWeekNum || 0;
            const _nxtWk = this.nextWeekNum || (_curWk >= 52 ? 1 : _curWk + 1);
            const _prvWk = _curWk <= 1 ? 52 : _curWk - 1;
            const _allowedWeeks = new Set([_curWk, _nxtWk].filter(w => w > 0).map(String));

            // Cross-DataView accumulators
            const _gqCandidates = {};              // goal candidates per (product|week)
            const _delSeen = new Set();            // delivery dedup
            const _ctSumMap = {};                  // cycle time sum (machine||product)
            const _ctCntMap = {};                  // cycle time count (machine||product)
            const machineMap = {};                 // all machines from Production DV
            const prodMap = {};                    // produced qty per product per week bucket
            const allProductNames = new Set();     // union of product names across DVs
            const pufferAccum = {};                // puffer name -> {product -> qty}
            const pufferLatestDate = {};           // puffer name -> {product -> latestDate} (for LATEST-snapshot semantics)

            // Classify each DataView by which roles are present and process it.
            for (let dvi = 0; dvi < dvs.length; dvi++) {
                const dv = dvs[dvi];
                if (!dv?.categorical?.categories?.[0]) continue;
                const cats = dv.categorical.categories;
                const allVals = dv.categorical.values || [];

                // Find category indices by role
                let prodNameIdx = -1, weekNumIdx = -1, machineIdx = -1, deliveryDateIdx = -1,
                    productTypeIdx = -1, parentProductIdx = -1, componentProductIdx = -1,
                    typeLevel1Idx = -1, typeLevel2Idx = -1, typeLevel3Idx = -1;
                for (let c = 0; c < cats.length; c++) {
                    const role = cats[c].source?.roles;
                    if (!role) continue;
                    // v3.3.39: independent if-checks so a single bound column carrying multiple
                    // roles (e.g. productName + componentProductId both pointing to
                    // Dim_Product[ProductName]) sets both indices.
                    if (role["productName"]) prodNameIdx = c;
                    if (role["weekNumber"]) weekNumIdx = c;
                    if (role["machineName"]) machineIdx = c;
                    if (role["deliveryDate"]) deliveryDateIdx = c;
                    if (role["productType"]) productTypeIdx = c;
                    if (role["parentProductId"]) parentProductIdx = c;
                    if (role["componentProductId"]) componentProductIdx = c;
                    // v3.3.49: type level role detection
                    if (role["typeLevel1"]) typeLevel1Idx = c;
                    if (role["typeLevel2"]) typeLevel2Idx = c;
                    if (role["typeLevel3"]) typeLevel3Idx = c;
                }
                if (prodNameIdx === -1 && parentProductIdx === -1) continue;

                const productNames = prodNameIdx >= 0 ? (cats[prodNameIdx]?.values || []) : [];
                const weekNums = weekNumIdx >= 0 ? (cats[weekNumIdx]?.values || []) : [];
                const machineNames = machineIdx >= 0 ? (cats[machineIdx]?.values || []) : [];
                const deliveryDates = deliveryDateIdx >= 0 ? (cats[deliveryDateIdx]?.values || []) : [];
                const productTypes = productTypeIdx >= 0 ? (cats[productTypeIdx]?.values || []) : [];
                const parentProducts = parentProductIdx >= 0 ? (cats[parentProductIdx]?.values || []) : [];
                const componentProducts = componentProductIdx >= 0 ? (cats[componentProductIdx]?.values || []) : [];
                const typeLevel1Vals = typeLevel1Idx >= 0 ? (cats[typeLevel1Idx]?.values || []) : [];
                const typeLevel2Vals = typeLevel2Idx >= 0 ? (cats[typeLevel2Idx]?.values || []) : [];
                const typeLevel3Vals = typeLevel3Idx >= 0 ? (cats[typeLevel3Idx]?.values || []) : [];

                // Find value indices by role
                let cycleTimeValIdx = -1, producedQtyValIdx = -1, goalQtyValIdx = -1,
                    deliveryQtyValIdx = -1, qtyPerValIdx = -1;
                const pufferValIndices = [];
                for (let v = 0; v < allVals.length; v++) {
                    const role = allVals[v].source?.roles;
                    if (role && role["cycleTime"]) cycleTimeValIdx = v;
                    else if (role && role["producedQty"]) producedQtyValIdx = v;
                    else if (role && role["goalQty"]) goalQtyValIdx = v;
                    else if (role && role["deliveryQty"]) deliveryQtyValIdx = v;
                    else if (role && role["qtyPer"]) qtyPerValIdx = v;
                    else if (role && role["pufferQty"]) {
                        pufferValIndices.push({ idx: v, name: allVals[v].source?.displayName || ("Puffer " + (pufferValIndices.length + 1)) });
                    }
                }
                const ctVals = cycleTimeValIdx >= 0 ? (allVals[cycleTimeValIdx]?.values || []) : [];
                const prodQtyVals = producedQtyValIdx >= 0 ? (allVals[producedQtyValIdx]?.values || []) : [];
                const goalQtyVals = goalQtyValIdx >= 0 ? (allVals[goalQtyValIdx]?.values || []) : [];
                const deliveryQtyVals = deliveryQtyValIdx >= 0 ? (allVals[deliveryQtyValIdx]?.values || []) : [];
                const qtyPerVals = qtyPerValIdx >= 0 ? (allVals[qtyPerValIdx]?.values || []) : [];

                // Collect all product names for union
                for (let i = 0; i < productNames.length; i++) {
                    const nm = String(productNames[i] || "");
                    if (nm) allProductNames.add(nm);
                }

                // Capture ProductType per product (if bound)
                if (productTypeIdx >= 0) {
                    for (let i = 0; i < productNames.length; i++) {
                        const pname = String(productNames[i] || "");
                        if (!pname) continue;
                        const ptype = productTypes.length > i ? String(productTypes[i] || "").trim() : "";
                        if (ptype) this.productTypeMap[pname] = ptype;
                    }
                }

                // v3.3.49: capture Type Level 1/2/3 per product
                if (typeLevel1Idx >= 0 || typeLevel2Idx >= 0 || typeLevel3Idx >= 0) {
                    if (!this.productTypeLevelMap) this.productTypeLevelMap = {};
                    for (let i = 0; i < productNames.length; i++) {
                        const pname = String(productNames[i] || "");
                        if (!pname) continue;
                        if (!this.productTypeLevelMap[pname]) this.productTypeLevelMap[pname] = {};
                        if (typeLevel1Idx >= 0 && typeLevel1Vals.length > i) {
                            const v = typeLevel1Vals[i];
                            if (v != null && v !== "") this.productTypeLevelMap[pname].typeLevel1 = String(v);
                        }
                        if (typeLevel2Idx >= 0 && typeLevel2Vals.length > i) {
                            const v = typeLevel2Vals[i];
                            if (v != null && v !== "") this.productTypeLevelMap[pname].typeLevel2 = String(v);
                        }
                        if (typeLevel3Idx >= 0 && typeLevel3Vals.length > i) {
                            const v = typeLevel3Vals[i];
                            if (v != null && v !== "") this.productTypeLevelMap[pname].typeLevel3 = String(v);
                        }
                    }
                }

                // Capture BOM (parent -> [{component, qtyPer}]) if bound.
                // v3.3.39: componentProductId is OPTIONAL. If unbound (or shares a category
                // with productName because the user bound the same column), fall back to
                // using productNames per row as the component side.
                if (parentProductIdx >= 0) {
                    const compSrc = (componentProductIdx >= 0 && componentProductIdx !== parentProductIdx)
                        ? componentProducts : productNames;
                    for (let i = 0; i < parentProducts.length; i++) {
                        const parent = String(parentProducts[i] || "").trim();
                        const comp = compSrc.length > i ? String(compSrc[i] || "").trim() : "";
                        if (!parent || !comp) continue;
                        if (parent === comp) continue; // skip same-name self-references
                        const qp = qtyPerVals.length > i ? (Number(qtyPerVals[i]) || 1) : 1;
                        if (!this.bomMap[parent]) this.bomMap[parent] = {};
                        // Use max in case duplicate rows appear
                        this.bomMap[parent][comp] = Math.max(this.bomMap[parent][comp] || 0, qp);
                    }
                }

                // v3.3.37: Inject BOM-known component & parent names into the product universe.
                // Components have no Fact_WeeklyGoal rows, so they never enter productNames
                // from the productName role binding — but they ARE in bomMap. Enrich here so
                // the downstream pipeline (dataProducts -> _getVirtualComponentGoals ->
                // _calculateAreaPlan) can plan them. Capabilities/dataView mappings unchanged.
                for (const _bomParent in this.bomMap) {
                    if (_bomParent) allProductNames.add(_bomParent);
                    for (const _bomComp in this.bomMap[_bomParent]) {
                        if (_bomComp) allProductNames.add(_bomComp);
                    }
                }

                // --- Production DV (has machineName + producedQty or cycleTime) ---
                const isProductionDV = (machineIdx >= 0) || (cycleTimeValIdx >= 0) || (producedQtyValIdx >= 0) || (pufferValIndices.length > 0);
                // --- Goals DV (has goalQty) ---
                const isGoalsDV = (goalQtyValIdx >= 0);
                // --- Deliveries DV (has deliveryQty or deliveryDate) ---
                const isDeliveriesDV = (deliveryQtyValIdx >= 0) || (deliveryDateIdx >= 0);

                // Track bound roles so the modal can switch between edit-mode and read-only display.
                if (isGoalsDV) this._goalBoundInData = true;
                if (isDeliveriesDV) this._deliveryBoundInData = true;

                // --- v3.3.10: Binding validator / smell-detect ---
                // W1: deliveryDate bound to an aggregated column (WeekStart / MonthStart / ...)
                //     collapses all dates in the bucket to the bucket-start (e.g. 2026-04-20 for week 17).
                if (deliveryDateIdx >= 0 && cats[deliveryDateIdx] && cats[deliveryDateIdx].source) {
                    const _src = cats[deliveryDateIdx].source;
                    const _hay = ((_src.queryName || "") + " " + (_src.displayName || "")).toLowerCase();
                    const _bad = ["weekstart", "monthstart", "yearstart", "quarterstart", "periodstart", "firstday"];
                    for (const _p of _bad) {
                        if (_hay.indexOf(_p) >= 0) {
                            this._bindingWarnings.push({
                                code: "DELIVERY_DATE_AGGREGATED",
                                severity: "error",
                                field: _src.displayName || _src.queryName || "Delivery Date",
                                en: "Delivery Date is bound to an aggregated column. Bind it to the raw date column of your delivery fact table (e.g. Fact_Delivery[DeliveryDate]).",
                                hu: "A Delivery Date aggregált oszlopra van kötve. Kösd a nyers dátum oszlopra a kiszállítás fact-ből (pl. Fact_Delivery[DeliveryDate])."
                            });
                            break;
                        }
                    }
                }
                // W2 (v3.3.14): REMOVED.
                // Previously we emitted "MACHINE_WITH_GOAL_OR_DELIVERY" whenever machineName
                // was bound together with goalQty/deliveryQty. This is a false positive in a
                // correctly modeled scenario — e.g. when the user enables bidirectional
                // cross-filtering on Dim_CycleTime ↔ Dim_Product, the Machine filter
                // propagates to every fact via the product dimension without triggering
                // InvalidUnconstrainedJoin. Since the visual has no reliable way to detect
                // whether the relationships actually allow the join, the warning annoys
                // users whose data model already works. Rather than show a banner that is
                // almost always wrong, we stay silent here and let PBI's own error surface
                // if the join genuinely fails at query time.
                // W3: deliveryQty bound without deliveryDate, or vice versa — user probably forgot a field.
                if (deliveryQtyValIdx >= 0 && deliveryDateIdx < 0) {
                    this._bindingWarnings.push({
                        code: "DELIVERY_QTY_NO_DATE",
                        severity: "info",
                        field: "Delivery Qty",
                        en: "Delivery Qty is bound but Delivery Date is not. Deliveries will be shown without dates.",
                        hu: "A Delivery Qty be van kötve, de a Delivery Date nincs. A kiszállítások dátum nélkül jelennek meg."
                    });
                }
                if (deliveryDateIdx >= 0 && deliveryQtyValIdx < 0) {
                    this._bindingWarnings.push({
                        code: "DELIVERY_DATE_NO_QTY",
                        severity: "info",
                        field: "Delivery Date",
                        en: "Delivery Date is bound but Delivery Qty is not. Deliveries will be ignored.",
                        hu: "A Delivery Date be van kötve, de a Delivery Qty nincs. A kiszállítások figyelmen kívül maradnak."
                    });
                }
                // When data is bound, reset the corresponding subfield on every affected product so bound data wins over user-entered values.
                if (isGoalsDV) {
                    for (const _pn in this.productGoals) {
                        if (this.productGoals[_pn]) this.productGoals[_pn].goalByWeek = {};
                    }
                }
                if (isDeliveriesDV) {
                    for (const _pn in this.productGoals) {
                        if (this.productGoals[_pn]) this.productGoals[_pn].deliveries = [];
                    }
                }

                if (isProductionDV) {
                    // Cycle time map (machine||product)
                    for (let i = 0; i < productNames.length; i++) {
                        const pname = String(productNames[i] || "");
                        if (!pname) continue;
                        const mname = machineNames.length > i ? String(machineNames[i]).trim() : "";
                        const ct = ctVals.length > i ? (Number(ctVals[i]) || 0) : 0;
                        if (mname && mname !== "null" && mname !== "undefined" && ct > 0) {
                            const key = mname + "||" + pname;
                            _ctSumMap[key] = (_ctSumMap[key] || 0) + ct;
                            _ctCntMap[key] = (_ctCntMap[key] || 0) + 1;
                        }
                    }
                    // Machine catalogue
                    for (let i = 0; i < machineNames.length; i++) {
                        const mn = String(machineNames[i] || "").trim();
                        if (mn && mn !== "null" && mn !== "undefined") {
                            if (!machineMap[mn]) {
                                machineMap[mn] = { name: mn, cycleTime: ctVals.length > i ? (Number(ctVals[i]) || 0) : 0 };
                            }
                        }
                    }
                    // Puffers: pick LATEST snapshot per product per puffer column.
                    // The deliveryDate category carries the snapshot date for buffer rows.
                    // If no date is bound, fall back to MAX. This moves the latest-snapshot
                    // semantics INSIDE the visual — no DAX measures needed.
                    for (const pv of pufferValIndices) {
                        const pufferVals = allVals[pv.idx]?.values || [];
                        if (!pufferAccum[pv.name]) pufferAccum[pv.name] = {};
                        if (!pufferLatestDate[pv.name]) pufferLatestDate[pv.name] = {};
                        const pm = pufferAccum[pv.name];
                        const pmDate = pufferLatestDate[pv.name];
                        for (let i = 0; i < productNames.length; i++) {
                            const pname = String(productNames[i] || "");
                            if (!pname) continue;
                            const rawQty = pufferVals[i];
                            if (rawQty == null) continue;
                            const qty = Number(rawQty) || 0;
                            if (qty === 0) continue;
                            const date = deliveryDates.length > i ? String(deliveryDates[i] || "") : "";
                            if (!date) {
                                if (pm[pname] == null || qty > pm[pname]) pm[pname] = qty;
                                continue;
                            }
                            if (!pmDate[pname] || date > pmDate[pname]) {
                                pmDate[pname] = date;
                                pm[pname] = qty;
                            }
                        }
                    }
                    // Produced qty per product per week (filtered to last area machines)
                    // Only filter by machine when machineName role is actually bound; otherwise
                    // aggregate across all machines so the visual still works when the user chose
                    // not to bind Machine Name (e.g. to avoid InvalidUnconstrainedJoin against
                    // Fact_WeeklyGoal / Fact_Delivery, which have no relationship to Dim_Machine).
                    // v3.3.65: case-insensitive machine matching + UNFILTERED fallback prodMap.
                    // If the lastAreaMachines filter yields zero current-week production but
                    // the unfiltered totals show production, use the unfiltered totals so
                    // a mismatched/empty area config or InvalidUnconstrainedJoin in the dataView
                    // doesn't silently zero out the Legyártott column.
                    const lastAreaMachines = this._getLastAreaMachineNames();
                    const _machineBound = machineIdx >= 0;
                    const _lcMachineSet = (lastAreaMachines && lastAreaMachines.size > 0)
                        ? new Set([...lastAreaMachines].map(n => String(n).trim().toLowerCase()))
                        : null;
                    if (!this._unfilteredProdMap) this._unfilteredProdMap = {};
                    const _unfilteredProdMap = this._unfilteredProdMap;
                    let _diagRowCount = 0, _diagSumProd = 0, _diagFilterPasses = 0, _diagFilterRejects = 0;
                    const _diagMachinesSeen = new Set();
                    for (let i = 0; i < productNames.length; i++) {
                        const pname = String(productNames[i] || "");
                        if (!pname) continue;
                        if (!prodMap[pname]) prodMap[pname] = { cur: 0, next: 0, prev: 0 };
                        if (!_unfilteredProdMap[pname]) _unfilteredProdMap[pname] = { cur: 0, next: 0, prev: 0 };
                        const wk = weekNums.length > i ? Number(weekNums[i]) : 0;
                        const qty = prodQtyVals.length > i ? (Number(prodQtyVals[i]) || 0) : 0;
                        _diagRowCount++;
                        _diagSumProd += qty;
                        // Always update the unfiltered fallback first
                        if (wk === _curWk) _unfilteredProdMap[pname].cur += qty;
                        else if (wk === _nxtWk) _unfilteredProdMap[pname].next += qty;
                        // Then apply the machine filter (case-insensitive) for the primary prodMap
                        if (_machineBound && _lcMachineSet) {
                            const mnRaw = machineNames.length > i ? String(machineNames[i] || "").trim() : "";
                            if (mnRaw) _diagMachinesSeen.add(mnRaw);
                            if (!_lcMachineSet.has(mnRaw.toLowerCase())) {
                                _diagFilterRejects++;
                                continue;
                            }
                            _diagFilterPasses++;
                        }
                        if (wk === _curWk) prodMap[pname].cur += qty;
                        else if (wk === _nxtWk) prodMap[pname].next += qty;
                    }
                    // v3.3.66: store diagnostic info on `this` so it can be rendered as
                    // an on-screen overlay (Power BI Desktop doesn't expose DevTools).
                    this._diagInfo = {
                        rows: _diagRowCount,
                        sumProducedQty: _diagSumProd,
                        machineBound: _machineBound,
                        lastAreaMachines: lastAreaMachines ? [...lastAreaMachines] : null,
                        machinesInData: [..._diagMachinesSeen],
                        filterPasses: _diagFilterPasses,
                        filterRejects: _diagFilterRejects,
                        curWk: _curWk,
                        nxtWk: _nxtWk,
                        timestamp: new Date().toISOString()
                    };
                }

                if (isGoalsDV) {
                    for (let i = 0; i < productNames.length; i++) {
                        const pname = String(productNames[i] || "");
                        if (!pname) continue;
                        const wk = weekNums.length > i ? Number(weekNums[i]) : 0;
                        const gq = goalQtyVals.length > i ? (Number(goalQtyVals[i]) || 0) : 0;
                        const wkKey = String(wk);
                        if (gq > 0 && wk > 0 && _allowedWeeks.has(wkKey)) {
                            const candKey = pname + "|" + wkKey;
                            if (!_gqCandidates[candKey]) _gqCandidates[candKey] = new Set();
                            _gqCandidates[candKey].add(gq);
                        }
                    }
                }

                if (isDeliveriesDV) {
                    // v3.3.11: When machineName is bound on the same visual, PBI cross-joins
                    // each delivery row with every machine (N machines -> N identical rows with
                    // the same qty/date, since Dim_Machine is unrelated to Fact_Delivery).
                    // The dedup key must NOT include the row index `i`, otherwise identical
                    // duplicates all survive and the delivery qty gets multiplied ×N.
                    // PBI already SUMs legitimate same-day shipments in SUMMARIZECOLUMNS, so
                    // two distinct rows with identical (product, date, qty, week) inside the
                    // same DV always mean cross-join duplicates.
                    for (let i = 0; i < productNames.length; i++) {
                        const pname = String(productNames[i] || "");
                        if (!pname) continue;
                        const wk = weekNums.length > i ? Number(weekNums[i]) : 0;
                        const dq = deliveryQtyVals.length > i ? (Number(deliveryQtyVals[i]) || 0) : 0;
                        const dDate = deliveryDates.length > i ? _toIsoDate(deliveryDates[i]) : "";
                        // Accept if we have a qty — prefer rows with valid date
                        if (dq <= 0) continue;
                        // If week is given, filter to allowed weeks; if no week, rely on date
                        if (wk > 0 && !_allowedWeeks.has(String(wk))) continue;
                        // Dedup key: product + date + qty + week (+ dvi to isolate across DVs).
                        // Intentionally EXCLUDES row index so cross-join duplicates collapse.
                        const sig = pname + "|" + dDate + "|" + dq + "|" + wk + "|" + dvi;
                        if (_delSeen.has(sig)) continue;
                        _delSeen.add(sig);
                        if (!this.productGoals[pname]) {
                            this.productGoals[pname] = { goalByWeek: {}, deliveries: [] };
                        }
                        this.productGoals[pname].deliveries.push({ qty: dq, date: dDate });
                    }
                }
            }

            // --- Finalise productGoals: pick MIN candidate per (product, week) ---
            for (const candKey in _gqCandidates) {
                const parts = candKey.split("|");
                const pname = parts[0];
                const wkKey = parts[1];
                const vals = [..._gqCandidates[candKey]].filter(v => v > 0);
                if (vals.length === 0) continue;
                const chosen = Math.min.apply(null, vals);
                if (!this.productGoals[pname]) {
                    this.productGoals[pname] = { goalByWeek: {}, deliveries: [] };
                }
                this.productGoals[pname].goalByWeek[wkKey] = chosen;
            }

            // --- Finalise cycleTimeMap (AVERAGE per key) ---
            for (const key in _ctSumMap) {
                this.cycleTimeMap[key] = _ctCntMap[key] > 0 ? (_ctSumMap[key] / _ctCntMap[key]) : 0;
            }

            // --- Finalise machines ---
            this.dataMachines = Object.values(machineMap).sort((a, b) => a.name.localeCompare(b.name));

            // --- Finalise puffers ---
            this.dataPuffers = Object.keys(pufferAccum).map(name => ({ name: name, data: pufferAccum[name] }));

            // --- Finalise products (sorted union) ---
            // v3.3.65: if the filtered prodMap has zero cur-week totals across ALL products
            // but the unfiltered fallback shows production, use the unfiltered numbers and
            // log a warning. This handles cases where the lastAreaMachines filter excludes
            // every row (mismatched names, empty area config, or Power BI returning rows
            // with machineName=null due to InvalidUnconstrainedJoin against unrelated facts).
            let _filteredCurTotal = 0, _unfilteredCurTotal = 0;
            for (const name of allProductNames) {
                _filteredCurTotal += (prodMap[name]?.cur || 0);
                _unfilteredCurTotal += (this._unfilteredProdMap?.[name]?.cur || 0);
            }
            const _useUnfiltered = (_filteredCurTotal === 0 && _unfilteredCurTotal > 0);
            if (this._diagInfo) {
                this._diagInfo.filteredCurTotal = _filteredCurTotal;
                this._diagInfo.unfilteredCurTotal = _unfilteredCurTotal;
                this._diagInfo.fallbackUsed = _useUnfiltered;
            }
            // (v3.7.47) when the filter zeroes out all production we fall back to unfiltered, silently (no console output, for certification)
            for (const name of [...allProductNames].sort()) {
                const pm = _useUnfiltered
                    ? (this._unfilteredProdMap[name] || { cur: 0, next: 0, prev: 0 })
                    : (prodMap[name] || { cur: 0, next: 0, prev: 0 });
                this.dataProducts.push({ name: name, producedQty: pm.cur, producedQtyNextWeek: pm.next, producedQtyPrevWeek: pm.prev });
            }
            // Reset the fallback map so subsequent renders re-aggregate cleanly
            this._unfilteredProdMap = {};

            // --- Inject virtual component goals from BOM / heuristic so planning pulls them through ---
            // A component with no explicit goals inherits the sum of its parents' goals (multiplied by QtyPer if BOM bound).
            // This makes the pull-principle planning engine treat components like regular planned products
            // in whichever chain can produce them, without exposing them in the Delivery & Goals tab.
            try {
                const _vGoals = this._getVirtualComponentGoals();
                for (const cname in _vGoals) {
                    const vg = _vGoals[cname];
                    if (!this.productGoals[cname]) {
                        this.productGoals[cname] = { goalByWeek: {}, deliveries: [] };
                    }
                    const pg = this.productGoals[cname];
                    if (!pg.goalByWeek) pg.goalByWeek = {};
                    // Only set if empty — do not overwrite any real goal already bound for the component
                    if ((vg.goalThisWeek || 0) > 0 && !(pg.goalByWeek[String(_curWk)] > 0)) {
                        pg.goalByWeek[String(_curWk)] = vg.goalThisWeek;
                    }
                    if ((vg.goalNextWeek || 0) > 0 && !(pg.goalByWeek[String(_nxtWk)] > 0)) {
                        pg.goalByWeek[String(_nxtWk)] = vg.goalNextWeek;
                    }
                    if ((vg.prevWeekGoal || 0) > 0 && !(pg.goalByWeek[String(_prvWk)] > 0)) {
                        pg.goalByWeek[String(_prvWk)] = vg.prevWeekGoal;
                    }
                    pg._virtual = true;
                }
            } catch (e) {}
        } catch (e) {}

        // v3.7.45: build per-product selectionIds for cross-visual filter-out
        // (AppSource cert 1180.2.2.3). Iterate dataViews and find the first one
        // with a productName category, then create a withCategory selectionId
        // per row. Use product name as the key so buildProductTile can look up
        // by dp.name.
        try {
            this.productSelectionIds = {};
            const _dvs = (options && options.dataViews) || [];
            for (let dvi = 0; dvi < _dvs.length; dvi++) {
                const dv = _dvs[dvi];
                if (!dv || !dv.categorical || !dv.categorical.categories || !dv.categorical.categories[0]) continue;
                const cats = dv.categorical.categories;
                let prodNameIdx = -1;
                for (let c = 0; c < cats.length; c++) {
                    if (cats[c].source && cats[c].source.roles && cats[c].source.roles["productName"]) { prodNameIdx = c; break; }
                }
                if (prodNameIdx === -1) continue;
                const category = cats[prodNameIdx];
                const values = category.values || [];
                for (let i = 0; i < values.length; i++) {
                    const pname = String(values[i] || "").trim();
                    if (!pname || this.productSelectionIds[pname]) continue;
                    try {
                        this.productSelectionIds[pname] = this.host
                            .createSelectionIdBuilder()
                            .withCategory(category, i)
                            .createSelectionId();
                    } catch (_e) {}
                }
                if (Object.keys(this.productSelectionIds).length > 0) break;
            }
        } catch (_e) {}
    }


    getFormattingModel() { return { cards: [] }; }

    // Helper: get all after-area IDs for an area (array-based)
    _getAfterIds(area) { return area.afterAreaIds || []; }
    _getBeforeIds(area) { return area.beforeAreaIds || []; }

    // Find the last production area in the flow chain and return its machine names as a Set
    _getLastAreaMachineNames() {
        if (!this.areas || this.areas.length === 0) return null;
        // v3.3.74: a "quality" area with its own machines is effectively a production
        // stage (it produces dataProducts via those machines). Treat it as part of the
        // chain so a final inspection step like Quality Inspection (QI-1/QI-2 machines)
        // can act as the bottleneck/last area, with upstream production areas pulling
        // from its plan instead of falling back to their own goals.
        const _isChainArea = (a) => a.type === "production" ||
                                    (a.type === "quality" && a.machines && a.machines.length > 0);
        const prodAreas = this.areas.filter(_isChainArea);
        if (prodAreas.length === 0) return null;
        // v3.3.69: use the same chain-traversal logic as the pipeline view
        // (_getProductionChain). The previous flat-iteration approach checked
        // only DIRECT afterAreaIds for production type — if an area's after-link
        // was a buffer (e.g. Hard Turning -> WIP3 -> Testing), the buffer-step
        // wasn't traversed and the area looked like a leaf, so the visual picked
        // an upstream area instead of the actual final production area.
        // The chain function walks through buffers properly, mirroring the
        // pipeline order. The LAST chain entry is the real last production area.
        try {
            const chain = this._getProductionChain ? this._getProductionChain() : [];
            if (chain && chain.length > 0) {
                const lastEntry = chain[chain.length - 1];
                if (lastEntry && lastEntry.area && lastEntry.area.machines && lastEntry.area.machines.length > 0) {
                    return new Set(lastEntry.area.machines.map(m => m.name));
                }
            }
        } catch (_e) {}
        // Fallback to the original flat iteration if chain is unusable
        let lastArea = null;
        for (const pa of prodAreas) {
            const afterIds = this._getAfterIds(pa);
            if (afterIds.length === 0) {
                lastArea = pa;
                break;
            }
            const hasProductionAfter = afterIds.some(id => {
                const a = this.areas.find(x => x.id === id);
                // v3.3.74: include quality-with-machines areas
                return a && (a.type === "production" ||
                             (a.type === "quality" && a.machines && a.machines.length > 0));
            });
            if (!hasProductionAfter) {
                lastArea = pa;
            }
        }
        if (!lastArea) {
            const pointedAsBefore = new Set(prodAreas.flatMap(a => this._getBeforeIds(a)));
            for (const pa of prodAreas) {
                if (!pointedAsBefore.has(pa.id)) lastArea = pa;
            }
        }
        if (!lastArea) lastArea = prodAreas[prodAreas.length - 1];
        const machines = lastArea.machines || [];
        if (machines.length === 0) return null;
        return new Set(machines.map(m => m.name));
    }

    // ========== PRODUCTION PLANNING ENGINE ==========

    // v3.3.76: per-area downstream resolution. BFS walks afterIds (through buffers)
    // to find the FIRST chain area downstream of `area`. Handles parallel branches
    // that the linear _getProductionChain misses (e.g. Hard Turning Pinion connected
    // to Testing through a buffer but not on the linearised chain path).
    // Returns { downstreamArea, bufferAfter } or null when no downstream chain area
    // is reachable -- in that case the area produces nothing in the pure-pull regime.
    _findDownstreamForArea(area) {
        if (!area) return null;
        const all = this._findAllDownstreamForArea(area);
        return all && all.length ? all[0] : null;
    }

    // v3.6.11: build an inline diag block (used in version-badge popup) that
    // shows productTypeLevelMap, downstreams, and Shot Peen plan totals.
    _buildShotPeenDiagBlock(th) {
        const sp = this.areas.find(a => /^sho+t peen$/i.test(a.customName || ''));
        if (!sp) return null;
        const lines = [];
        lines.push("=== SHOT PEEN DIAG (v3.7.11) ===");
        lines.push("currentWeekNum=" + this.currentWeekNum + ", nextWeekNum=" + this.nextWeekNum);
        lines.push("");
        lines.push("--- Machines ---");
        for (const m of (sp.machines || [])) {
            lines.push("  " + m.name +
                ": parallelLanes=" + m.parallelLanes +
                ", laneGroupKey=" + m.laneGroupKey +
                ", allowedProducts=" + ((m.allowedProducts||[]).length) +
                ", machineGroupKey=" + JSON.stringify(m.machineGroupKey || null) +
                ", machineGroupBindKey=" + JSON.stringify(m.machineGroupBindKey || null) +
                ", cycleTimeAlias=" + JSON.stringify(m.cycleTimeAlias || null));
        }
        lines.push("");
        lines.push("--- productTypeLevelMap ---");
        const tlm = this.productTypeLevelMap || {};
        const keyProducts = ['GS17 Pinion','GS17 Ring','GS18 Pinion','GS18 Ring','GS19 Pinion','GS19 Ring','GS20 Pinion','GS20 Ring'];
        for (const p of keyProducts) {
            const e = tlm[p] || {};
            lines.push("  " + p + ": TL1=" + e.typeLevel1 + " TL2=" + e.typeLevel2);
        }
        lines.push("");
        lines.push("--- Downstreams ---");
        let _diagDownAreas = [];
        try {
            const dss = this._findAllDownstreamForArea(sp) || [];
            for (let i=0; i<dss.length; i++) {
                const d = dss[i];
                _diagDownAreas.push(d.downstreamArea);
                lines.push("  [" + i + "] " + (d.downstreamArea?.customName) + " (buffer: " + (d.bufferAfter?.customName || "direct") + ")");
            }
        } catch (e) { lines.push("  ERR: " + e.message); }
        lines.push("");

        // v3.7.11: comprehensive per-downstream diagnostic.
        try {
            lines.push("--- Each downstream's plan + their afterIds chain ---");
            const keyPinProds = ['GS17 Pinion','GS18 Pinion','GS19 Pinion','GS20 Pinion'];
            for (let i=0; i<_diagDownAreas.length; i++) {
                const da = _diagDownAreas[i];
                if (!da) continue;
                // Chain after this area (which buffer/area it goes to next)
                const afterIds = (da.afterAreaIds || []).map(id => {
                    const a = this.areas.find(x => x.id === id);
                    return a ? a.customName : id;
                });
                lines.push("  [" + i + "] " + (da.customName) + " → afterIds: " + JSON.stringify(afterIds));
                // Recursive downstreams
                const dss2 = this._findAllDownstreamForArea(da) || [];
                lines.push("       findAllDownstream: " + dss2.map(d => d.downstreamArea?.customName).join(", "));
                // Plan totals for key Pinion products (always show, even if 0)
                const oldCache = this._planCache;
                this._planCache = {};
                const dp = this._calculateAreaPlan(da);
                this._planCache = oldCache;
                if (!dp) { lines.push("       PLAN=NULL"); continue; }
                const nonPast = dp.dailyPlan.filter(s=>!s.isPast).slice(0, 4);
                for (const pn of keyPinProds) {
                    const perSlot = nonPast.map((sl, idx) => {
                        let qty = 0;
                        for (const m of sl.machines) {
                            for (const p of (m.products||[])) if (p.productName === pn) qty += p.qty;
                        }
                        return idx + ":" + qty;
                    });
                    lines.push("       " + pn + " plan: " + perSlot.join(" | "));
                }
            }
        } catch (e) { lines.push("  TRACE ERR: " + e.message); }
        lines.push("");
        try {
            const oldCache = this._planCache;
            this._planCache = {};
            const plan = this._calculateAreaPlan(sp);
            this._planCache = oldCache;
            if (!plan) { lines.push("Plan: NULL"); }
            else {
                lines.push("--- Shot Peen totals per product ---");
                const tot = {};
                for (const sl of plan.dailyPlan.filter(s=>!s.isPast)) {
                    for (const m of sl.machines) {
                        const prods = (m.products||[]).filter(p=>p.qty>0);
                        for (const p of prods) tot[p.productName] = (tot[p.productName]||0) + p.qty;
                    }
                }
                for (const k of Object.keys(tot).sort()) lines.push("  " + k + " = " + tot[k]);
                lines.push("");
                lines.push("--- First 6 non-past slots ---");
                for (const sl of plan.dailyPlan.filter(s=>!s.isPast).slice(0,6)) {
                    for (const m of sl.machines) {
                        const prods = (m.products||[]).filter(p=>p.qty>0);
                        if (prods.length===0) continue;
                        const sum = prods.reduce((s,p)=>s+p.qty,0);
                        lines.push("  " + sl.dayLabel + " " + sl.shiftLabel + " " + m.machineName + ": " + prods.map(p=>p.productName+"="+p.qty).join(" | ") + " (" + sum + ")");
                    }
                }
            }
        } catch (e) { lines.push("Plan err: " + e.message); }

        const block = document.createElement('div');
        block.style.cssText = "background:#0d1117;color:#e8e8f0;padding:10px;border-radius:6px;border:1px solid #30363d;font-family:monospace;font-size:10px;white-space:pre;max-width:680px;max-height:520px;overflow:auto;box-shadow:0 4px 16px rgba(0,0,0,0.6);";
        block.textContent = lines.join("\n");
        return block;
    }

    // Legacy popup-overlay (still kept for click handlers in webapp).
    _showShotPeenDiag() {
        const sp = this.areas.find(a => /^sho+t peen$/i.test(a.customName || ''));
        if (!sp) { alert("No Shot Peen area"); return; }
        const lines = [];
        lines.push("=== SHOT PEEN DIAG (v3.7.11) ===");
        lines.push("currentWeekNum=" + this.currentWeekNum + ", nextWeekNum=" + this.nextWeekNum);
        lines.push("");
        lines.push("--- Machines ---");
        for (const m of (sp.machines || [])) {
            lines.push("  " + m.name +
                ": parallelLanes=" + m.parallelLanes +
                ", laneGroupKey=" + m.laneGroupKey +
                ", allowedProducts=" + ((m.allowedProducts||[]).length) + " items" +
                ", machineGroupKey=" + JSON.stringify(m.machineGroupKey || null) +
                ", machineGroupBindKey=" + JSON.stringify(m.machineGroupBindKey || null));
        }
        lines.push("");
        lines.push("--- productTypeLevelMap (key products) ---");
        const tlm = this.productTypeLevelMap || {};
        const keyProducts = ['GS17 Pinion','GS17 Ring','GS18 Pinion','GS18 Ring','GS19 Pinion','GS19 Ring','GS20 Pinion','GS20 Ring'];
        for (const p of keyProducts) {
            const e = tlm[p] || {};
            lines.push("  " + p + ": TL1=" + e.typeLevel1 + " TL2=" + e.typeLevel2 + " TL3=" + e.typeLevel3);
        }
        lines.push("");
        lines.push("--- Downstreams (via _findAllDownstreamForArea) ---");
        const dss = this._findAllDownstreamForArea(sp) || [];
        for (let i=0; i<dss.length; i++) {
            const d = dss[i];
            lines.push("  [" + i + "] " + (d.downstreamArea?.customName) + " (via buffer: " + (d.bufferAfter?.customName || "direct") + ")");
        }
        lines.push("");
        // Trigger plan for Shot Peen and inspect demand pool
        try {
            this._planCache = {};
            const plan = this._calculateAreaPlan(sp);
            if (!plan) { lines.push("Plan returned NULL"); }
            else {
                lines.push("--- Shot Peen plan totals per product ---");
                const tot = {};
                for (const sl of plan.dailyPlan.filter(s=>!s.isPast)) {
                    for (const m of sl.machines) {
                        const prods = (m.products||[]).filter(p=>p.qty>0);
                        for (const p of prods) tot[p.productName] = (tot[p.productName]||0) + p.qty;
                    }
                }
                for (const k of Object.keys(tot).sort()) lines.push("  " + k + " = " + tot[k]);
                // Dump first 4 non-past slots in detail
                lines.push("");
                lines.push("--- Shot Peen first 6 non-past slots (per machine) ---");
                for (const sl of plan.dailyPlan.filter(s=>!s.isPast).slice(0,6)) {
                    for (const m of sl.machines) {
                        const prods = (m.products||[]).filter(p=>p.qty>0);
                        if (prods.length===0) continue;
                        const sum = prods.reduce((s,p)=>s+p.qty,0);
                        lines.push("  " + sl.dayLabel + " " + sl.shiftLabel + " " + m.machineName + ": " + prods.map(p=>p.productName+"="+p.qty).join(" | ") + " (sum " + sum + ")");
                    }
                }
            }
        } catch (e) { lines.push("Plan computation failed: " + e.message); }

        // Render in a fixed overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:99999;display:flex;align-items:center;justify-content:center;";
        const panel = document.createElement('div');
        panel.style.cssText = "background:#0d1117;color:#e8e8f0;padding:16px;border-radius:8px;max-width:900px;max-height:80vh;overflow:auto;font-family:monospace;font-size:11px;white-space:pre;border:1px solid #30363d;";
        const header = document.createElement('div');
        header.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-family:sans-serif;";
        { const _hb = document.createElement('b'); _hb.textContent = 'Shot Peen Diag — v3.6.11'; header.appendChild(_hb); }
        const closeBtn = document.createElement('button');
        closeBtn.textContent = "Bezár";
        closeBtn.style.cssText = "background:#21262d;color:#e8e8f0;border:1px solid #30363d;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;";
        closeBtn.onclick = () => overlay.remove();
        header.appendChild(closeBtn);
        const body = document.createElement('div');
        body.textContent = lines.join("\n");
        panel.appendChild(header);
        panel.appendChild(body);
        overlay.appendChild(panel);
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        document.body.appendChild(overlay);
    }

    // v3.6.0: Returns ALL immediate-next chain areas reachable through afterIds
    // (passing through buffers but stopping at the first chain area on each path).
    // Used by mainstream planning to handle BRANCHED topology (one area feeding
    // multiple downstream chain areas — e.g. Teeth Cutting → {Furnace, Carb Stop}
    // or Shot Peen → {Straightering, Hard Turning Ring}). Each entry includes
    // the buffer crossed on the way to that downstream (or null for direct).
    _findAllDownstreamForArea(area) {
        if (!area) return [];
        const _hasMachines = (a) => a && a.machines && a.machines.length > 0;
        const _isChainArea = (a) => a && (a.type === "production" ||
                                          (a.type === "quality" && _hasMachines(a)));
        const results = [];
        const foundChainIds = new Set();
        // Per-direct-after BFS: for EACH afterId we BFS independently so each
        // surfaced chain-area carries the SPECIFIC bufferAfter on its path.
        for (const directId of (this._getAfterIds(area) || [])) {
            const seen = new Set([area.id]);
            const stack = [{ id: directId, bufferAfter: null }];
            while (stack.length) {
                const { id, bufferAfter } = stack.pop();
                if (seen.has(id)) continue;
                seen.add(id);
                const a = this.areas.find(x => x.id === id);
                if (!a) continue;
                if (_isChainArea(a)) {
                    if (!foundChainIds.has(a.id)) {
                        foundChainIds.add(a.id);
                        results.push({ downstreamArea: a, bufferAfter: bufferAfter });
                    }
                    continue; // do not descend past this chain area
                }
                if (a.type === "buffer") {
                    const buf = bufferAfter || a; // first buffer on the path
                    for (const nid of (this._getAfterIds(a) || [])) {
                        if (!seen.has(nid)) stack.push({ id: nid, bufferAfter: buf });
                    }
                }
            }
        }
        return results;
    }

    // ============================================================
    // v3.3.83: CLEAN MAINSTREAM PLANNING -- pure pull, from scratch
    // ============================================================
    // For a non-last area, plan = mirror downstream's per-slot consumption
    // shifted by `shiftOffset`, with WIP buffer subtracted, distributed across
    // this area's machines. Pure pull, no scoring, no bonuses. If downstream
    // doesn't pull anything, this area produces nothing.
    //
    // Handles parallel chains: BOM expansion at downstream's plan slots adds
    // component (Pinion / Ring) demand from finished gearset (GS**) plans, so
    // both Hard Turning Ring and Hard Turning Pinion can pull from the same
    // Testing plan -- each picks the products its machines can produce.
    _calculateMainstreamAreaPlan(area, downstreamArea, bufAfter) {
        // ============================================================
        // v3.6.0: PER-SLOT MIRROR with MULTI-DOWNSTREAM support.
        // ============================================================
        // For each non-past upstream slot K, produce exactly what the
        // downstream area(s) consume at slot (K + offset) -- BOM-expanded,
        // with running buffer balance subtracted. When the area branches
        // into MULTIPLE next chain areas (e.g. Teeth Cutting → Furnace +
        // Carb Stop, Shot Peen → Straightering + Hard Turning Ring),
        // demand is summed across all downstreams with per-product
        // SPECIALIZATION dedup: a product is taken from the downstream
        // whose machines most-narrowly allow it. RING demand thus flows
        // through Carb Stop / HT_Ring (specialised) instead of being
        // double-counted via Furnace (mixed). No urgency, no scoring,
        // no cumulative -- pure per-slot mirror.
        const machines = area.machines || [];
        if (machines.length === 0) return null;

        // --- Time setup ---
        const wdpw = this._getAreaWorkDaysPerWeek(area);
        const allDays = this._getPlanWorkdays(wdpw);
        const curWeekDays = allDays.filter(d => d.week === this.currentWeekNum);
        const nxtWeekDays = allDays.filter(d => d.week === this.nextWeekNum);
        const allScheduleDays = [...curWeekDays, ...nxtWeekDays];
        const shiftCount = area.shiftSettings?.shiftCount || 1;
        const shiftMins = this.getShiftMinutes(area);
        const stops = this.getTotalPlannedStop(area);
        const availMinPerShift = Math.max(0, shiftMins - stops);
        if (availMinPerShift === 0) return null;

        // --- v3.6.0: Resolve ALL immediate downstream chain areas ---
        // Falls back to the legacy single-downstream args if the BFS
        // returns nothing (defensive).
        let downstreams = this._findAllDownstreamForArea(area);
        if ((!downstreams || downstreams.length === 0) && downstreamArea) {
            downstreams = [{ downstreamArea, bufferAfter: bufAfter }];
        }
        if (!downstreams || downstreams.length === 0) return null;

        // Get each downstream's plan (recursive). Skip nulls.
        const downPlans = downstreams.map(ds => ({
            area: ds.downstreamArea,
            buffer: ds.bufferAfter,
            plan: this._calculateAreaPlan(ds.downstreamArea),
        })).filter(x => x.plan);
        if (downPlans.length === 0) return null;

        // --- Build per-slot consumption from each downstream, then merge per product
        //     using ownership. We need the ALIGNMENT to be: upstreamSlot K -> downSlot K+offset.
        //     Each downstream's plan is independent in time (each has its own day grid),
        //     but in our setup they all share the same day grid (same shift template),
        //     so per-slot indexing aligns. We compute non-past slot index per plan.
        const buildPerSlot = (plan) => {
            const downSlots = plan.dailyPlan.filter(s => !s.isPast);
            return downSlots.map(slot => {
                const cons = {};
                for (const mach of slot.machines) {
                    if (!mach.qty || mach.qty <= 0 || !mach.productName || mach.productName === "-") continue;
                    const prods = (mach.products && mach.products.length > 0) ? mach.products : [{productName: mach.productName, qty: mach.qty, bucket: mach.bucket}];
                    for (const pp of prods) {
                        if (!pp.qty || pp.qty <= 0 || !pp.productName || pp.productName === "-") continue;
                        const pn = pp.productName;
                        cons[pn] = (cons[pn] || 0) + pp.qty;
                        if (this.bomMap && this.bomMap[pn]) {
                            for (const comp in this.bomMap[pn]) {
                                const qp = this.bomMap[pn][comp] || 1;
                                cons[comp] = (cons[comp] || 0) + pp.qty * qp;
                            }
                        }
                    }
                }
                return cons;
            });
        };
        // v3.7.14: per-slot per-product BUCKET map built from each downstream's plan.
        // BOM-propagated: when downstream produces parent GS01 with bucket "nxtGoal",
        // its components (PIN-GS01, RING-GS01) also inherit "nxtGoal" so the upstream
        // mainstream scheduler labels them as "Jövő heti cél" instead of "E heti cél".
        // If multiple parents map to the same component with different buckets,
        // nxtGoal wins (mainstream output that feeds ANY next-week need is labeled next).
        const buildPerSlotBuckets = (plan) => {
            const downSlots = plan.dailyPlan.filter(s => !s.isPast);
            return downSlots.map(slot => {
                const buck = {};
                const setBuck = (pn, b) => {
                    if (!b) return;
                    if (!buck[pn]) { buck[pn] = b; return; }
                    // nxtGoal / nxtDelivery beats curGoal / curDelivery
                    if (String(b).startsWith("nxt") && !String(buck[pn]).startsWith("nxt")) {
                        buck[pn] = b;
                    }
                };
                for (const mach of slot.machines) {
                    if (!mach.qty || mach.qty <= 0 || !mach.productName || mach.productName === "-") continue;
                    const prods = (mach.products && mach.products.length > 0) ? mach.products : [{productName: mach.productName, qty: mach.qty, bucket: mach.bucket}];
                    for (const pp of prods) {
                        if (!pp.qty || pp.qty <= 0 || !pp.productName || pp.productName === "-") continue;
                        const pn = pp.productName;
                        const pb = pp.bucket || mach.bucket || null;
                        setBuck(pn, pb);
                        if (this.bomMap && this.bomMap[pn]) {
                            for (const comp in this.bomMap[pn]) {
                                if ((this.bomMap[pn][comp] || 0) > 0) setBuck(comp, pb);
                            }
                        }
                    }
                }
                return buck;
            });
        };
        const perDownConsumption = downPlans.map(dp => buildPerSlot(dp.plan));
        const perDownBuckets = downPlans.map(dp => buildPerSlotBuckets(dp.plan));
        const slotsCount = Math.max(...perDownConsumption.map(a => a.length));

        // Per-product owner downstream:
        //   1. Find ALL downstreams that consume the product (perDownConsumption).
        //   2. If only ONE consumes -> that's the owner.
        //   3. If multiple consume -> pick the downstream whose machines OUTPUT
        //      this product with the SMALLEST allowedProducts list (= most
        //      specialised). RING flows through Carb Stop / HT_Ring; mixed
        //      Furnace / Shot Peen lose ownership of RING.
        //   4. If multiple consume but none output it -> first consumer wins.
        const _consumesIn = (di, pn) => {
            const arr = perDownConsumption[di];
            for (const cons of arr) {
                if ((cons[pn] || 0) > 0) return true;
            }
            return false;
        };
        // v3.7.7: owner resolution with TRANSITIVE FILTER.
        //   Pull principle: when Straightering consumes GS20 Pinion AND
        //   Hard Turning Pinion (HTP) ALSO consumes it, but HTP is reachable
        //   downstream of Straightering (Shot Peen → Straightering → B05 →
        //   HTP), HTP must not own it — Straightering does. Otherwise PIN
        //   that Straightering needs gets pulled through HTP's plan, which
        //   for an end-of-chain product may be 0 → Shot Peen produces 0.
        //
        //   Selection order:
        //   1) Filter candidates to downstreams that actually CONSUME the product.
        //   2) Remove any candidate that is transitively downstream of another
        //      candidate (pull happens through the EARLIER candidate).
        //   3) Tie-break by specificity (smaller allowedProducts list wins).
        //   4) Secondary tie-break by actual demand.
        const _totalDemandForDown = (di, pn) => {
            const arr = perDownConsumption[di];
            if (!arr) return 0;
            let sum = 0;
            for (const slot of arr) sum += (slot && slot[pn]) || 0;
            return sum;
        };
        // v3.7.7: recursive chain-area discovery (one direction). Returns
        // the set of all chain areas reachable downstream of `startArea`.
        const _allChainDescendants = (startArea) => {
            const seen = new Set();
            const visit = (a) => {
                if (!a) return;
                const ds = this._findAllDownstreamForArea(a) || [];
                for (const d of ds) {
                    const id = d.downstreamArea?.id;
                    if (!id || seen.has(id)) continue;
                    seen.add(id);
                    visit(d.downstreamArea);
                }
            };
            visit(startArea);
            return seen;
        };
        const _ownerOfProduct = (pn) => {
            let candidates = [];
            for (let di = 0; di < downPlans.length; di++) {
                if (_consumesIn(di, pn)) candidates.push(di);
            }
            if (candidates.length === 0) return undefined;
            if (candidates.length === 1) return candidates[0];

            // v3.7.7: remove candidates that are transitively downstream of
            // another candidate. Pre-compute descendant sets for each candidate.
            const descSets = {};
            for (const di of candidates) {
                descSets[di] = _allChainDescendants(downPlans[di].area);
            }
            const filtered = candidates.filter(di => {
                const myId = downPlans[di].area.id;
                for (const dj of candidates) {
                    if (dj === di) continue;
                    if (descSets[dj] && descSets[dj].has(myId)) {
                        return false; // I am downstream of another candidate.
                    }
                }
                return true;
            });
            const eligible = filtered.length > 0 ? filtered : candidates;
            if (eligible.length === 1) return eligible[0];

            // Specificity + demand tie-break on remaining candidates.
            const scored = eligible.map(di => {
                const ms = downPlans[di].area.machines || [];
                let minSize = Infinity;
                for (const m of ms) {
                    const ap = m.allowedProducts;
                    if (!ap || ap.length === 0) {
                        if (minSize > 1e9) minSize = 1e9;
                    } else if (ap.includes(pn)) {
                        if (ap.length < minSize) minSize = ap.length;
                    }
                }
                return { di, minSize, demand: _totalDemandForDown(di, pn) };
            });
            scored.sort((a, b) => {
                if (a.minSize !== b.minSize) return a.minSize - b.minSize;
                if (b.demand !== a.demand) return b.demand - a.demand;
                return a.di - b.di;
            });
            return scored[0].di;
        };

        // Compute owner once per product seen.
        const productOwner = {};
        for (const arr of perDownConsumption) {
            for (const cons of arr) {
                for (const pn of Object.keys(cons)) {
                    if (productOwner[pn] !== undefined) continue;
                    const o = _ownerOfProduct(pn);
                    if (o !== undefined) productOwner[pn] = o;
                }
            }
        }

        // Merged downConsumption[s] = sum over (downIdx, slot) where
        //   downIdx === productOwner[product]. Products without owner are dropped.
        const downConsumption = [];
        for (let s = 0; s < slotsCount; s++) {
            const merged = {};
            for (let di = 0; di < perDownConsumption.length; di++) {
                const cons = perDownConsumption[di][s];
                if (!cons) continue;
                for (const pn of Object.keys(cons)) {
                    if (productOwner[pn] !== di) continue;
                    merged[pn] = (merged[pn] || 0) + cons[pn];
                }
            }
            downConsumption.push(merged);
        }

        // --- Initial buffer (snapshot from source data) ---
        // Use the buffer crossed on the path to the OWNING downstream for each
        // product. Multiple distinct buffers may be in play (one per branch).
        const bufferBalanceByDown = downPlans.map(dp => {
            const bal = {};
            const buf = dp.buffer;
            if (buf) {
                const pufIdx = buf.selectedPufferIdx || 0;
                const pufData = this.dataPuffers?.[pufIdx];
                if (pufData && pufData.data) {
                    for (const pn of Object.keys(pufData.data)) {
                        bal[pn] = pufData.data[pn] || 0;
                    }
                }
            }
            return bal;
        });
        // Helper: subtract from the right buffer for a product (its owner's buffer).
        const _bufferSub = (pn, need) => {
            const di = productOwner[pn];
            if (di === undefined) return need;
            const bal = bufferBalanceByDown[di];
            const have = bal[pn] || 0;
            if (have <= 0) return need;
            const taken = Math.min(have, need);
            bal[pn] = have - taken;
            return need - taken;
        };

        const relativeOffset = Math.max(0, area.shiftSettings?.shiftOffset ?? 1);

        // --- For each downstream slot, subtract from buffer first; remainder is upstream slot demand ---
        // upstreamDemandPerSlot[K] = {product: qty} -- what upstream slot K must produce.
        // Mapping: downstream slot S -> upstream slot S - offset.
        const upstreamDemandByDownSlot = downConsumption.map(c => ({}));
        for (let S = 0; S < downConsumption.length; S++) {
            for (const product of Object.keys(downConsumption[S])) {
                let need = downConsumption[S][product];
                need = _bufferSub(product, need);
                if (need > 0) {
                    upstreamDemandByDownSlot[S][product] = need;
                }
            }
        }

        // --- Build set of all products that appear in upstream demand (for productNeeds + colors) ---
        const allProducts = new Set();
        for (const d of upstreamDemandByDownSlot) {
            for (const p of Object.keys(d)) allProducts.add(p);
        }
        // v3.7.21: stable per-product color index — same product name maps to
        // the same slot across all areas. Palette pulled live from theme on render.
        const planColors = this._getPlanColors();
        const productColorIdx = {};
        for (const p of allProducts) productColorIdx[p] = this._stableColorIdx(p);

        // --- Schedule per-upstream-slot (v3.6.0: capacity-fill pre-build) ---
        // Each upstream machine first serves its mirror target slot (slot K +
        // offset). If time remains, advance to the NEXT future target slot and
        // pull from its demand. Continue until shift time runs out or all
        // future demand is exhausted. This eliminates idle capacity when the
        // downstream chain has known future demand. The mutation is applied
        // directly to upstreamDemandByDownSlot so cross-machine and cross-slot
        // pulls are consistent (no double counting).
        const lastProductOnMachine = {};
        const dailyPlan = [];
        let nonPastSlotIdx = -1;
        const shiftLabelPrefix = this.language === "hu" ? "M" : "S";
        const chain = this._getProductionChain();
        const chainIdxLocal = chain.findIndex(c => c.area.id === area.id);

        // For accurate "this-week / next-week" labels we need the SOURCE
        // downstream slot's week, not the upstream production day's week.
        // All downstreams share the same date grid in our setup, so use the
        // first downstream's non-past slot info.
        const downSlotsInfo = downPlans[0].plan.dailyPlan.filter(s => !s.isPast);

        // Track total scheduled per product (for diag)
        const totalScheduled = {};

        for (let di = 0; di < allScheduleDays.length; di++) {
            const day = allScheduleDays[di];
            for (let si = 0; si < shiftCount; si++) {
                const shiftEntry = {
                    dayLabel: day.dayLabel,
                    shiftLabel: shiftCount > 1 ? (shiftLabelPrefix + (si + 1)) : "",
                    shiftIdx: si,
                    dateStr: day.dateStr,
                    week: day.week,
                    targetWeek: day.week === this.currentWeekNum ? "this" : "next",
                    isNextWeekGoal: day.week !== this.currentWeekNum,
                    isPast: day.isPast,
                    isToday: day.isToday,
                    isFirstShiftOfDay: si === 0,
                    machines: []
                };
                if (day.isPast) {
                    for (const m of machines) {
                        shiftEntry.machines.push({ machineName: m.name, productName: "-", qty: 0, colorIdx: -1, bucket: null, bucketLabel: null, products: [] });
                    }
                    dailyPlan.push(shiftEntry);
                    continue;
                }
                nonPastSlotIdx++;
                const slotK = nonPastSlotIdx;
                const minTargetSlot = slotK + relativeOffset;

                // v3.7+: machineGroupKey bind values for this shift.
                // Machines that share a machineGroupKey must produce products
                // whose machineGroupBindKey (typically typeLevel2) match the
                // group's locked value. The lock is chosen per shift as the
                // bind value with the HIGHEST joint upstream demand across all
                // machines in that group, considering only products at least
                // ONE machine in the group can produce.
                const _shiftTypeLevelMap = this.productTypeLevelMap || {};
                const _shiftGroupedMachines = {}; // groupKey -> [machine]
                for (const _gm of machines) {
                    if (!_gm.machineGroupKey) continue;
                    if (!_shiftGroupedMachines[_gm.machineGroupKey]) _shiftGroupedMachines[_gm.machineGroupKey] = [];
                    _shiftGroupedMachines[_gm.machineGroupKey].push(_gm);
                }
                // v3.7.8: LAZY LOCK. Don't pre-compute the bind value from
                // demand horizon. Instead, the bind value is LAZILY set when
                // the first machine in the group makes its first pick — the
                // pure-pull logic picks whatever has the most demand at that
                // slot, and the sister machines must match that TL2.
                // This matches webapp behaviour: pull determines what's picked,
                // the group constraint just keeps sister machines on the same
                // TL2 family within the shift.
                const _shiftGroupBindValue = {}; // mutable: filled as machines pick

                for (const m of machines) {
                    // Downtime
                    const mDown = m.downtime?.[day.dateStr];
                    const isDown = mDown && (mDown.allDay || (mDown.shifts && mDown.shifts.includes(si)));
                    if (isDown) {
                        shiftEntry.machines.push({ machineName: m.name, productName: "-", qty: 0, colorIdx: -1, bucket: null, bucketLabel: null, products: [], isDown: true });
                        continue;
                    }
                    // v3.7+: this machine's group bind constraint (if any).
                    // v3.7.8: read bind value DYNAMICALLY from _shiftGroupBindValue
                    // (which may be set lazily during this shift's machine
                    // iteration). If still null, all products pass.
                    const _mgKey = m.machineGroupKey || null;
                    const _mgBindKey = m.machineGroupBindKey || "typeLevel2";
                    const _mgPassesBind = (productName) => {
                        if (!_mgKey) return true;
                        const _mgBindValue = _shiftGroupBindValue[_mgKey];
                        if (_mgBindValue == null) return true; // not locked yet
                        const _entry = _shiftTypeLevelMap[productName] || {};
                        const _v = _entry[_mgBindKey];
                        return _v != null && _v !== "" && String(_v) === _mgBindValue;
                    };
                    // Per-product accumulator (one entry per product across the shift,
                    // even if pulled from multiple target slots / lanes).
                    const machineProductsMap = {};
                    const machineProductsOrder = [];

                    // v3.6.11: parallelLanes — a machine with parallelLanes > 1 has
                    // multiple INDEPENDENT product streams in parallel within the
                    // same shift. With laneGroupKey set, all lanes must share the
                    // same group value (e.g. typeLevel2 = "220") and have DIFFERENT
                    // differKey values (e.g. typeLevel1 = "Pinion" vs "Ring") so a
                    // machine produces e.g. PIN-GS17 + RING-GS17 in parallel.
                    const _laneCount = Math.max(1, parseInt(m.parallelLanes, 10) || 1);
                    const _laneGroupKey = m.laneGroupKey || (m.sameParentLanes ? "parent" : "");
                    const _typeLevelMap = this.productTypeLevelMap || {};
                    const _bomMapRef = this.bomMap || {};
                    const _groupOf = (productName) => {
                        if (_laneGroupKey === "parent") {
                            for (const _parent in _bomMapRef) {
                                if (_bomMapRef[_parent] && _bomMapRef[_parent][productName] !== undefined) return _parent;
                            }
                            const _idx = String(productName).lastIndexOf('-');
                            if (_idx >= 0) return String(productName).slice(_idx + 1);
                            return productName;
                        }
                        if (_laneGroupKey === "typeLevel1" || _laneGroupKey === "typeLevel2" || _laneGroupKey === "typeLevel3") {
                            const _entry = _typeLevelMap[productName] || {};
                            const _v = _entry[_laneGroupKey];
                            return _v != null && _v !== "" ? String(_v) : ("__none__" + productName);
                        }
                        return productName;
                    };
                    const _differKeyOf = (productName) => {
                        const _entry = _typeLevelMap[productName] || {};
                        if (_laneGroupKey === "typeLevel3") {
                            return _entry.typeLevel2 != null && _entry.typeLevel2 !== "" ? String(_entry.typeLevel2) : productName;
                        }
                        if (_laneGroupKey === "typeLevel2") {
                            return _entry.typeLevel1 != null && _entry.typeLevel1 !== "" ? String(_entry.typeLevel1) : productName;
                        }
                        if (_laneGroupKey === "parent") {
                            if (_entry.typeLevel1 != null && _entry.typeLevel1 !== "") return String(_entry.typeLevel1);
                            const _name = String(productName);
                            const _hi = _name.indexOf('-');
                            if (_hi > 0) return _name.slice(0, _hi);
                            return productName;
                        }
                        return productName;
                    };
                    let _machineGroupValue = null;
                    const _completedDifferKeys = new Set(); // sealed at end of each lane

                    for (let _lane = 0; _lane < _laneCount; _lane++) {
                        let timeLeft = availMinPerShift;
                        let cur = minTargetSlot;
                        // Each lane locks to ONE differKey on its first pick so that
                        // subsequent lanes can find DIFFERENT differKeys (e.g. lane 0
                        // = Pinion, lane 1 = Ring) — without this, lane 0 would gobble
                        // every differKey and lane 1 would stay empty.
                        let _laneDifferKey = null;
                        while (timeLeft > 0 && cur < upstreamDemandByDownSlot.length) {
                            const slotDem = upstreamDemandByDownSlot[cur];
                            if (!slotDem) { cur++; continue; }

                            // Continuity-first ordering
                            const lastP = lastProductOnMachine[m.name];
                            const order = [];
                            if (lastP && (slotDem[lastP] || 0) > 0 && this._machineCanProduce(m, lastP)) {
                                order.push(lastP);
                            }
                            // v3.6.11: sort remaining keys by descending demand so
                            // the highest-demand product wins lane allocation. Without this,
                            // insertion order can pick a small RING product over a large
                            // PIN-GS20 demand, causing the lane to lock to the wrong family.
                            const _sortedKeys = Object.keys(slotDem).sort((a,b) => (slotDem[b]||0) - (slotDem[a]||0));
                            for (const p of _sortedKeys) {
                                if (!order.includes(p)) order.push(p);
                            }

                            for (const product of order) {
                                if ((slotDem[product] || 0) <= 0) continue;
                                if (!this._machineCanProduce(m, product)) continue;
                                // v3.7+: machineGroupKey bind constraint —
                                // when two machines share a machineGroupKey,
                                // they must both run products with the same
                                // bind-key value (typeLevel2) for this shift.
                                if (!_mgPassesBind(product)) continue;
                                // Lane-group constraints (v3.6.11):
                                //  - all lanes on this machine share the same group value (e.g. TL2)
                                //  - this lane must use ONE differKey only (locked on first pick)
                                //  - lanes > 0 must use a differKey not used by any prior lane
                                const _gk = _groupOf(product);
                                const _dk = _differKeyOf(product);
                                if (_laneGroupKey && _machineGroupValue !== null && _gk !== _machineGroupValue) continue;
                                // v3.7.13: only lock differKey when laneGrouping is in effect.
                                // Without laneGroupKey the scheduler can mix products in same slot.
                                if (_laneGroupKey && _laneDifferKey !== null && _dk !== _laneDifferKey) continue;
                                if (_lane > 0 && _completedDifferKeys.has(_dk)) continue;

                                const ct = this._getCT(m, product, m.cycleTime);
                                if (ct <= 0) continue;
                                const maxFromTime = Math.floor(timeLeft / ct);
                                if (maxFromTime <= 0) { timeLeft = 0; break; }
                                const qty = Math.min(maxFromTime, slotDem[product]);
                                if (qty <= 0) continue;

                                // v3.7.45: MIN-FRAGMENT GUARD (Option A). Don't add a tiny sliver
                                // of a SECONDARY product just to top off the shift. Carry its
                                // remaining demand to the NEXT target slot so nothing is dropped
                                // (the mainstream mirror would otherwise lose it). Only when there
                                // is a next slot to carry into; the first product is never guarded.
                                if (machineProductsOrder.length >= 1 && qty * ct < availMinPerShift * 0.10
                                    && cur + 1 < upstreamDemandByDownSlot.length) {
                                    if (!upstreamDemandByDownSlot[cur + 1]) upstreamDemandByDownSlot[cur + 1] = {};
                                    upstreamDemandByDownSlot[cur + 1][product] =
                                        (upstreamDemandByDownSlot[cur + 1][product] || 0) + slotDem[product];
                                    slotDem[product] = 0;
                                    continue;
                                }

                                // Lock the group value and lane differKey on first pick.
                                if (_laneGroupKey && _machineGroupValue === null) {
                                    _machineGroupValue = _gk;
                                }
                                // v3.7.13: only lock when laneGrouping in effect.
                                if (_laneGroupKey && _laneDifferKey === null) {
                                    _laneDifferKey = _dk;
                                }
                                // v3.7.8: machineGroupKey LAZY LOCK — on first
                                // successful pick anywhere in this group, lock
                                // the group's bind value so sister machines
                                // must match this product's TL.
                                if (_mgKey && _shiftGroupBindValue[_mgKey] == null) {
                                    const _bindEntry = _shiftTypeLevelMap[product] || {};
                                    const _bindV = _bindEntry[_mgBindKey];
                                    if (_bindV != null && _bindV !== "") {
                                        _shiftGroupBindValue[_mgKey] = String(_bindV);
                                    }
                                }

                                // v3.7.14: bucket label follows the OWNER downstream's actual
                                // per-product bucket at slot `cur` (BOM-propagated), so this
                                // mainstream slot is labeled "Jövő heti cél" whenever the
                                // downstream slot that consumes it is producing for next-week
                                // (e.g. Sun overflow-fill, or any nxt-week slot). Falls back
                                // to calendar-week heuristic if the bucket map has no entry.
                                const srcInfo = downSlotsInfo[cur];
                                const _ownerDi = productOwner[product];
                                let _srcBucket = null;
                                if (_ownerDi !== undefined && perDownBuckets[_ownerDi] && perDownBuckets[_ownerDi][cur]) {
                                    _srcBucket = perDownBuckets[_ownerDi][cur][product] || null;
                                }
                                let bucket;
                                if (_srcBucket) {
                                    bucket = String(_srcBucket).startsWith("nxt") ? "nxtGoal" : "curGoal";
                                } else if (srcInfo && srcInfo.isNextWeekGoal) {
                                    bucket = "nxtGoal";
                                } else {
                                    const srcWeek = srcInfo ? srcInfo.week : day.week;
                                    bucket = srcWeek === this.currentWeekNum ? "curGoal" : "nxtGoal";
                                }
                                const bucketLabel = this.t(bucket === "curGoal" ? "curWeekGoal" : "nxtWeekGoal");
                                const colorIdx = productColorIdx[product] || 0;

                                if (!machineProductsMap[product]) {
                                    machineProductsMap[product] = { productName: product, qty: 0, colorIdx, bucket, bucketLabel };
                                    machineProductsOrder.push(product);
                                }
                                machineProductsMap[product].qty += qty;
                                if (bucket === "curGoal") {
                                    machineProductsMap[product].bucket = bucket;
                                    machineProductsMap[product].bucketLabel = bucketLabel;
                                }
                                slotDem[product] -= qty;
                                timeLeft -= qty * ct;
                                lastProductOnMachine[m.name] = product;
                                totalScheduled[product] = (totalScheduled[product] || 0) + qty;
                                if (timeLeft <= 0) break;
                            }

                            cur++;
                        }
                        // Seal lane's differKey so subsequent lanes pick a different one.
                        if (_laneDifferKey !== null) _completedDifferKeys.add(_laneDifferKey);
                    } // end lane loop

                    const machineProducts = machineProductsOrder.map(pn => machineProductsMap[pn]);
                    if (machineProducts.length === 0) {
                        shiftEntry.machines.push({ machineName: m.name, productName: "-", qty: 0, colorIdx: -1, bucket: null, bucketLabel: null, products: [] });
                    } else {
                        const primary = machineProducts[0];
                        shiftEntry.machines.push({
                            machineName: m.name,
                            productName: primary.productName,
                            qty: primary.qty,
                            colorIdx: primary.colorIdx,
                            bucket: primary.bucket,
                            bucketLabel: primary.bucketLabel,
                            products: machineProducts
                        });
                    }
                }
                dailyPlan.push(shiftEntry);
            }
        }

        // --- Build flat productNeeds (for renderer compatibility) ---
        const productNeeds = [];
        for (const p of allProducts) {
            const total = totalScheduled[p] || 0;
            // total may be 0 if downstream slot demand was small or buffer covered all
            // Sum all upstream demand
            let totalDemand = 0;
            for (const d of upstreamDemandByDownSlot) totalDemand += (d[p] || 0);
            if (totalDemand === 0) continue;
            productNeeds.push({
                name: p, curDelivery: 0, curGoal: totalDemand, nxtDelivery: 0, nxtGoal: 0,
                curDeliveryOrig: 0, curGoalOrig: totalDemand, nxtDeliveryOrig: 0, nxtGoalOrig: 0,
                curDeliveryDate: null, nxtDeliveryDate: null
            });
        }

        // === DIAG ===
        try {
            if (!this._diagPlanInfo) this._diagPlanInfo = { chain: [], areas: {} };
            const _aname = area.customName || area.name || area.id;
            const _topNeeds = productNeeds.slice().sort((a, b) => b.curGoal - a.curGoal).slice(0, 8)
                .map(p => ({ name: p.name, total: p.curGoal }));
            this._diagPlanInfo.areas[_aname] = {
                type: area.type,
                chainIdx: chainIdxLocal,
                isOrphan: chainIdxLocal === -1,
                isLastArea: false,
                downstream: downPlans.map(dp => dp.area.customName || dp.area.name).join(' + '),
                productNeedsCount: productNeeds.length,
                topNeeds: _topNeeds,
                topCumDemand: _topNeeds.slice(0, 5)
            };
        } catch (_e) {}

        // v3.7.16: post-process — multi-product fragment redistribution.
        // Previously this only ran on the last-area path. Mainstream
        // (Teeth Cutting etc.) needs it too — that's where small Ring/Pinion
        // tails were being assigned to fresh machines while sister machines
        // already ran the same product. v3.7.17: now passes machines +
        // availMinPerShift so capacity checks fire on the target machine.
        this._consolidateMultiProductFragments(dailyPlan, area, machines, availMinPerShift);

        // v3.7.15: post-process — move small single-product leftovers onto a
        // sister machine already running the same product. Honours machine
        // capability + cycle time + remaining shift capacity. Configurable per
        // area via area.consolidationThresholdPct (default 30%, 0 disables).
        this._consolidateSinglesIntoExistingMachine(dailyPlan, area, machines, availMinPerShift);

        return {
            dailyPlan,
            productNeeds,
            chainPosition: chainIdxLocal >= 0 ? chainIdxLocal : 0,
            totalAreas: chain.length,
            pipelineOffset: relativeOffset,
            curWeekNum: this.currentWeekNum,
            nxtWeekNum: this.nextWeekNum,
            planColors
        };
    }

    // Returns ordered array of: [{area, bufferAfter, qualityAreas}] — chain areas in flow order.
    // v3.3.74: a "quality" area that has its OWN MACHINES counts as a chain stage (i.e. it
    // really is a final-production step). A quality area without machines is a side-constraint
    // (throughput cap on its upstream production area). This lets a user-configured "Quality
    // Inspection" step (with QI-1 / QI-2 machines that produce gearsets) act as the actual
    // last-area-in-chain so upstream areas (Phosphate, Testing, ...) pull from it.
    _getProductionChain() {
        const _hasMachines = (a) => a && a.machines && a.machines.length > 0;
        const _isChainArea = (a) => a && (a.type === "production" ||
                                          (a.type === "quality" && _hasMachines(a)));
        const _isSideQuality = (a) => a && a.type === "quality" && !_hasMachines(a);

        const prodAreas = this.areas.filter(_isChainArea);
        if (prodAreas.length === 0) return [];

        // Find first chain area: no before-links to other chain areas
        let first = null;
        for (const pa of prodAreas) {
            const beforeIds = this._getBeforeIds(pa);
            if (beforeIds.length === 0) { first = pa; break; }
            const hasChainBefore = beforeIds.some(id => {
                const b = this.areas.find(x => x.id === id);
                return _isChainArea(b);
            });
            if (!hasChainBefore) { first = pa; break; }
        }
        if (!first) {
            const afterTargets = new Set(this.areas.flatMap(a => this._getAfterIds(a)));
            for (const pa of prodAreas) {
                if (!afterTargets.has(pa.id)) { first = pa; break; }
            }
        }
        if (!first) first = prodAreas[0];

        // Walk chain via afterAreaIds — note buffers, attach side-quality (no machines).
        const chain = [];
        let current = first;
        const visited = new Set();
        while (current && !visited.has(current.id)) {
            visited.add(current.id);
            const entry = { area: current, bufferAfter: null, qualityAreas: [] };

            const afterIds = this._getAfterIds(current);
            let nextProd = null;

            for (const aid of afterIds) {
                const after = this.areas.find(a => a.id === aid);
                if (!after) continue;
                if (after.type === "buffer") {
                    entry.bufferAfter = after;
                    // Through the buffer: pick next chain area, attach side-quality
                    const bufAfterIds = this._getAfterIds(after);
                    for (const baid of bufAfterIds) {
                        const ba = this.areas.find(a => a.id === baid);
                        if (!ba) continue;
                        if (_isChainArea(ba) && !nextProd) nextProd = ba;
                        else if (_isSideQuality(ba)) entry.qualityAreas.push(ba);
                    }
                } else if (_isChainArea(after)) {
                    if (!nextProd) nextProd = after;
                } else if (_isSideQuality(after)) {
                    entry.qualityAreas.push(after);
                }
            }
            chain.push(entry);
            current = nextProd;
        }
        return chain;
    }

    // ISO week number from Date object
    _toLocalDateStr(d) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return yyyy + '-' + mm + '-' + dd;
    }

    _getISOWeek(d) {
        const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        dt.setUTCDate(dt.getUTCDate() + 4 - (dt.getUTCDay() || 7));
        const y1 = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
        return Math.ceil(((dt - y1) / 86400000 + 1) / 7);
    }

    // Get work days per week for an area based on its shift template
    _getAreaWorkDaysPerWeek(area) {
        const ss = area?.shiftSettings;
        if (!ss) return 5;
        const tmpl = SHIFT_TEMPLATES[ss.selectedShiftIdx];
        return (tmpl && tmpl.workDays) ? tmpl.workDays : 5;
    }

    // Get workdays for planning: current week + next week
    // workDaysPerWeek: 5=Mon-Fri, 6=Mon-Sat, 7=Mon-Sun
    _getPlanWorkdays(workDaysPerWeek) {
        const wdpw = workDaysPerWeek || 5;
        const days = [];
        const dayNames_hu = ["V", "H", "K", "Sze", "Cs", "P", "Szo"];
        const dayNames_en = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Go back to Monday of the current week
        const d = new Date(today);
        const todayDow = d.getDay();
        const daysBack = todayDow === 0 ? 6 : todayDow - 1;
        d.setDate(d.getDate() - daysBack);
        // Generate 2 full weeks (14 days) starting from this Monday
        for (let i = 0; i < 14; i++) {
            const dow = d.getDay(); // 0=Sun..6=Sat
            // Determine if this day is a workday based on workDaysPerWeek
            let isWorkDay = false;
            if (wdpw >= 7) isWorkDay = true; // 7 days = every day
            else if (wdpw >= 6) isWorkDay = (dow >= 1 && dow <= 6); // Mon-Sat
            else isWorkDay = (dow >= 1 && dow <= 5); // Mon-Fri
            if (isWorkDay) {
                const wk = this._getISOWeek(d);
                const isPast = d < today;
                days.push({
                    date: new Date(d),
                    dateStr: this._toLocalDateStr(d),
                    dayLabel: (this.language === "hu" ? dayNames_hu[dow] : dayNames_en[dow]) + " " + d.getDate() + "/" + (d.getMonth() + 1),
                    week: wk,
                    isPast: isPast,
                    isToday: d.getTime() === today.getTime()
                });
            }
            d.setDate(d.getDate() + 1);
        }
        return days;
    }

    // Get cycle time for a specific machine×product, with fallback.
    // v3.7+: when machineName is a logical/split machine (e.g. "SP-1 Pinion"),
    // the caller may pass a machine object so we can honour `cycleTimeAlias`.
    // Signature stays backward compatible: machineName can be a string OR an
    // object {name, cycleTimeAlias}.
    _getCT(machineName, productName, fallbackCT) {
        let _key = machineName;
        if (machineName && typeof machineName === "object") {
            _key = machineName.cycleTimeAlias || machineName.name;
        }
        let _ct = this.cycleTimeMap[_key + "||" + productName];
        // Fallback to alias-stripped lookup if direct lookup misses and a
        // string was passed but the machine row in this.areas has an alias.
        if (!_ct && typeof machineName === "string") {
            // No alias context — leave as-is.
        }
        return _ct || fallbackCT || 0;
    }

    // Helper: given a machine object, return the key used to look up cycle times.
    _ctKeyOf(machine) {
        if (!machine) return "";
        return machine.cycleTimeAlias || machine.name || "";
    }

    // Check if a machine is allowed to produce a given product
    // If allowedProducts is not set or empty, the machine can produce everything
    _machineCanProduce(machine, productName) {
        if (!machine.allowedProducts || machine.allowedProducts.length === 0) return true;
        return machine.allowedProducts.includes(productName);
    }

    // v3.7.21 / v3.7.25: stable, deterministic color index for a FAMILY name.
    // v3.7.25: switched from pure DJB2 hash to SEQUENTIAL ALLOCATION over an
    // alphabetically-sorted family registry. Sequential indices line up with
    // the 7-step max-distance palette permutation, so the first 20 families
    // get 20 maximally-distinct hues instead of random hash collisions in
    // the same hue cluster (the v3.7.24 "GS18/GS19/GS20 all blue" bug).
    // Hash fallback preserved for names that didn't appear in the registry
    // build (e.g. an orphan product added between renders).
    _stableColorIdx(name) {
        if (!name) return 0;
        if (!this._familyColorRegistry) {
            this._familyColorRegistry = this._buildFamilyColorRegistry();
        }
        if (Object.prototype.hasOwnProperty.call(this._familyColorRegistry, name)) {
            return this._familyColorRegistry[name];
        }
        // Fallback: DJB2 hash for unregistered names.
        let h = 5381;
        const s = String(name);
        for (let i = 0; i < s.length; i++) {
            h = ((h << 5) + h) ^ s.charCodeAt(i);
        }
        return Math.abs(h | 0) % PLAN_COLORS_DARK.length;
    }

    // v3.7.25: build a stable family→slot map from bomMap parents + any
    // orphan products in the data set. Alphabetical sort guarantees that
    // adding/removing an area or shuffling the report doesn't reshuffle the
    // existing families' colors. Slot indices wrap modulo palette length —
    // with 20 slots, the 21st family starts re-using slot 0 (and the
    // wrap-around still respects the max-distance hue order, so even the
    // 21st family lands on a far-apart hue from the 20th).
    _buildFamilyColorRegistry() {
        const bom = this.bomMap || {};
        const families = new Set();
        // Parents = explicit families.
        for (const parent of Object.keys(bom)) {
            if (bom[parent] && Object.keys(bom[parent]).length > 0) {
                families.add(parent);
            }
        }
        // Orphan products (no BOM entry) also count as self-families so they
        // get a sequential slot too — otherwise they'd fall back to hash and
        // could collide with a sequentially-allocated parent's slot.
        if (Array.isArray(this.dataProducts)) {
            for (const dp of this.dataProducts) {
                const name = dp && dp.name;
                if (!name) continue;
                let isComponent = false;
                for (const parent of Object.keys(bom)) {
                    if (bom[parent] && Object.prototype.hasOwnProperty.call(bom[parent], name)) {
                        isComponent = true;
                        break;
                    }
                }
                if (!isComponent && !families.has(name)) families.add(name);
            }
        }
        const sorted = [...families].sort();
        const reg = {};
        const PALETTE_LEN = PLAN_COLORS_DARK.length;
        sorted.forEach((f, i) => { reg[f] = i % PALETTE_LEN; });
        return reg;
    }

    // v3.7.21: theme-aware palette dispatch. Render code calls this on every
    // paint, so toggling the theme swaps the palette live with no plan
    // recalculation needed.
    _getPlanColors() {
        return this.theme === "light" ? PLAN_COLORS_LIGHT : PLAN_COLORS_DARK;
    }

    // v3.7.23: Hierarchical product coloring — a parent product and all its
    // BOM components share the SAME palette slot (one hue per family), but
    // the parent gets the base color and each component gets a progressively
    // lighter tint. So e.g. GS04 + GS04 Pinion + GS04 Ring all show as
    // distinct shades of the SAME green, GS17 family as different blues, etc.
    // Family resolution uses this.bomMap built by readDataProducts():
    //   - If productName is a parent (key in bomMap with >=1 component) → it's the family head, tier 0.
    //   - Else look it up as a component value → family is the parent name; tier = alphabetical sibling index + 1.
    //   - Else (orphan, no BOM) → self-family, tier 0 (same as pre-v3.7.23 behaviour).
    _getProductFamily(productName) {
        if (!productName) return { family: '', tier: 0 };
        const bom = this.bomMap || {};
        if (bom[productName] && Object.keys(bom[productName]).length > 0) {
            return { family: productName, tier: 0 };
        }
        for (const parent of Object.keys(bom)) {
            const comps = bom[parent];
            if (comps && Object.prototype.hasOwnProperty.call(comps, productName)) {
                const siblings = Object.keys(comps).sort();
                const idx = siblings.indexOf(productName);
                return { family: parent, tier: idx + 1 };
            }
        }
        return { family: productName, tier: 0 };
    }

    // v3.7.23: RGB tint (mix with white). amount=0 returns the original color;
    // amount=1 returns pure white. Used to derive component shades from the
    // parent's base palette color. Falls back to the input on malformed hex.
    _tintColor(hex, amount) {
        if (!hex || typeof hex !== 'string' || hex[0] !== '#') return hex || '';
        const h = hex.slice(1);
        if (h.length !== 6) return hex;
        const r = parseInt(h.slice(0, 2), 16);
        const g = parseInt(h.slice(2, 4), 16);
        const b = parseInt(h.slice(4, 6), 16);
        if (Number.isNaN(r + g + b)) return hex;
        const a = Math.max(0, Math.min(1, amount));
        const tr = Math.round(r + (255 - r) * a);
        const tg = Math.round(g + (255 - g) * a);
        const tb = Math.round(b + (255 - b) * a);
        const toHex = (n) => n.toString(16).padStart(2, '0');
        return '#' + toHex(tr) + toHex(tg) + toHex(tb);
    }

    // v3.7.23: Main entry point — call from render code instead of indexing
    // into the palette directly. Returns the hex color for a product, taking
    // family + tier + current theme into account. Cached per (theme, name).
    // The cache is reset in update() whenever data refreshes.
    _getProductColor(productName) {
        if (!productName || productName === "-" || productName === "—") return null;
        if (!this._productColorCache) this._productColorCache = {};
        const cacheKey = (this.theme || 'dark') + '|' + productName;
        const cached = this._productColorCache[cacheKey];
        if (cached) return cached;
        const info = this._getProductFamily(productName);
        const palette = this._getPlanColors();
        const baseHex = palette[this._stableColorIdx(info.family) % palette.length];
        // Tier ladder. Tier 0 = parent (base color). Each subsequent tier
        // gets a progressively lighter tint, capped to keep components
        // distinguishable from white backgrounds at high tiers.
        const TIER_TINTS = [0, 0.22, 0.40, 0.55, 0.65, 0.72, 0.78];
        const t = TIER_TINTS[Math.min(info.tier, TIER_TINTS.length - 1)];
        const out = t > 0 ? this._tintColor(baseHex, t) : baseHex;
        this._productColorCache[cacheKey] = out;
        return out;
    }

    // v3.7.15 / v3.7.17: Move SINGLE-product leftovers onto another machine
    // that already runs the same product. Complements
    // _consolidateMultiProductFragments which handles the multi-product case.
    // Three placement strategies, in order:
    //   A) Another machine in the SAME shift already has this product -> merge.
    //   B) Another machine's PREVIOUS shift ended with this product -> prepend
    //      to that machine's current shift (creates a continuation block).
    //   C) Another machine's NEXT shift starts with this product -> append
    //      to that machine's current shift (continuation into next shift).
    // v3.7.17: default threshold raised 30 -> 100 (always try, subject to
    // capacity). The threshold is now an aggressiveness slider, not a hard
    // cutoff. 0 disables. Always honours _machineCanProduce + cycle time +
    // remaining shift capacity on the target machine, so the receiving
    // machine cannot be over-allocated.
    _consolidateSinglesIntoExistingMachine(dailyPlan, area, machines, availMinPerShift) {
        if (!dailyPlan || dailyPlan.length === 0) return;
        if (!machines || machines.length < 2) return;
        const rawPct = (area && area.consolidationThresholdPct != null)
            ? +area.consolidationThresholdPct : 100;
        if (!(rawPct > 0)) return; // 0 or NaN/negative disables the pass
        const pct = Math.max(0, Math.min(100, rawPct)) / 100;

        const _machByName = {};
        for (const mm of machines) _machByName[mm.name] = mm;

        const _resetEmpty = (m) => {
            m.productName = "-"; m.qty = 0; m.colorIdx = -1;
            m.bucket = null; m.bucketLabel = null;
        };

        const _targetUsedMin = (other) => {
            const tm = _machByName[other.machineName];
            if (!tm) return Infinity;
            let used = 0;
            for (const p of (other.products || [])) {
                const ct = this._getCT(tm, p.productName, tm.cycleTime);
                if (ct > 0) used += (p.qty || 0) * ct;
            }
            return used;
        };

        const _canFit = (other, productName, qty) => {
            const tm = _machByName[other.machineName];
            if (!tm) return false;
            if (!this._machineCanProduce(tm, productName)) return false;
            const ct = this._getCT(tm, productName, tm.cycleTime);
            if (ct <= 0) return false;
            return _targetUsedMin(other) + qty * ct <= availMinPerShift;
        };

        for (let ei = 0; ei < dailyPlan.length; ei++) {
            const entry = dailyPlan[ei];
            if (entry.isPast) continue;
            const machEntries = entry.machines;
            if (!machEntries || machEntries.length < 2) continue;

            let changed = true;
            let safety = 0;
            while (changed && safety++ < 50) {
                changed = false;
                for (let mi = 0; mi < machEntries.length && !changed; mi++) {
                    const m = machEntries[mi];
                    if (!m.products || m.products.length !== 1) continue; // single-product only
                    if (m.isDown) continue;
                    const frag = m.products[0];
                    if (!frag || (frag.qty || 0) <= 0) continue;
                    const srcMach = _machByName[m.machineName];
                    if (!srcMach) continue;
                    const ctSrc = this._getCT(srcMach, frag.productName, srcMach.cycleTime);
                    if (ctSrc <= 0) continue;
                    const shiftCapacity = Math.floor(availMinPerShift / ctSrc);
                    if (shiftCapacity <= 0) continue;
                    if (frag.qty >= shiftCapacity * pct) continue; // not "small" enough

                    let moved = false;

                    // Strategy A: SAME shift on another machine already has this product
                    for (let mj = 0; mj < machEntries.length && !moved; mj++) {
                        if (mi === mj) continue;
                        const other = machEntries[mj];
                        if (!other.products || other.products.length === 0) continue;
                        if (other.isDown) continue;
                        const existing = other.products.find(p => p.productName === frag.productName);
                        if (!existing) continue;
                        if (!_canFit(other, frag.productName, frag.qty)) continue;
                        existing.qty += frag.qty;
                        if (frag.buckets && existing.buckets) {
                            for (const b of frag.buckets) {
                                if (!existing.buckets.includes(b)) existing.buckets.push(b);
                            }
                        }
                        m.products.splice(0, 1);
                        _resetEmpty(m);
                        moved = true; changed = true;
                    }

                    // Strategy B: PREVIOUS shift on another machine ended with this product
                    if (!moved && ei > 0) {
                        const prevEntry = dailyPlan[ei - 1];
                        if (prevEntry && !prevEntry.isPast) {
                            for (let mj = 0; mj < machEntries.length && !moved; mj++) {
                                if (mi === mj) continue;
                                const otherCurr = machEntries[mj];
                                if (!otherCurr.products || otherCurr.products.length === 0) continue;
                                if (otherCurr.isDown) continue;
                                const prevMach = prevEntry.machines.find(pm => pm.machineName === otherCurr.machineName);
                                if (!prevMach || !prevMach.products || prevMach.products.length === 0) continue;
                                const prevLast = prevMach.products[prevMach.products.length - 1];
                                if (prevLast.productName !== frag.productName) continue;
                                if (!_canFit(otherCurr, frag.productName, frag.qty)) continue;
                                if (otherCurr.products[0].productName === frag.productName) {
                                    otherCurr.products[0].qty += frag.qty;
                                    if (frag.buckets && otherCurr.products[0].buckets) {
                                        for (const b of frag.buckets) {
                                            if (!otherCurr.products[0].buckets.includes(b)) otherCurr.products[0].buckets.push(b);
                                        }
                                    }
                                } else {
                                    otherCurr.products.unshift({
                                        productName: frag.productName, qty: frag.qty,
                                        colorIdx: frag.colorIdx, bucket: frag.bucket,
                                        bucketLabel: frag.bucketLabel,
                                        buckets: frag.buckets ? [...frag.buckets] : []
                                    });
                                    otherCurr.productName = frag.productName;
                                    otherCurr.qty = frag.qty;
                                    otherCurr.colorIdx = frag.colorIdx;
                                    otherCurr.bucket = frag.bucket;
                                    otherCurr.bucketLabel = frag.bucketLabel;
                                }
                                m.products.splice(0, 1);
                                _resetEmpty(m);
                                moved = true; changed = true;
                            }
                        }
                    }

                    // Strategy C: NEXT shift on another machine starts with this product
                    if (!moved && ei + 1 < dailyPlan.length) {
                        const nextEntry = dailyPlan[ei + 1];
                        if (nextEntry && !nextEntry.isPast) {
                            for (let mj = 0; mj < machEntries.length && !moved; mj++) {
                                if (mi === mj) continue;
                                const otherCurr = machEntries[mj];
                                if (!otherCurr.products || otherCurr.products.length === 0) continue;
                                if (otherCurr.isDown) continue;
                                const nextMach = nextEntry.machines.find(nm => nm.machineName === otherCurr.machineName);
                                if (!nextMach || !nextMach.products || nextMach.products.length === 0) continue;
                                if (nextMach.products[0].productName !== frag.productName) continue;
                                if (!_canFit(otherCurr, frag.productName, frag.qty)) continue;
                                const lastProd = otherCurr.products[otherCurr.products.length - 1];
                                if (lastProd.productName === frag.productName) {
                                    lastProd.qty += frag.qty;
                                    if (frag.buckets && lastProd.buckets) {
                                        for (const b of frag.buckets) {
                                            if (!lastProd.buckets.includes(b)) lastProd.buckets.push(b);
                                        }
                                    }
                                } else {
                                    otherCurr.products.push({
                                        productName: frag.productName, qty: frag.qty,
                                        colorIdx: frag.colorIdx, bucket: frag.bucket,
                                        bucketLabel: frag.bucketLabel,
                                        buckets: frag.buckets ? [...frag.buckets] : []
                                    });
                                }
                                m.products.splice(0, 1);
                                _resetEmpty(m);
                                moved = true; changed = true;
                            }
                        }
                    }
                }
            }
        }
    }

    // v3.7.16 / v3.7.17: MULTI-PRODUCT TAIL CONSOLIDATION.
    // For any shift where a machine carries 2+ products, try to move the
    // non-primary tail products (products[1..end]) onto another machine that
    // already runs the same product. The PRIMARY product (products[0]) stays
    // on the source machine — it's the largest / first-picked product for
    // that shift, so we don't shuffle it. Three placement strategies in order:
    //   A) Another machine in the SAME shift already has this product -> merge.
    //   B) Another machine's PREVIOUS shift ended with this product -> prepend
    //      to that machine's current shift (continuation block).
    //   C) Another machine's NEXT shift starts with this product -> append
    //      to that machine's current shift (continuation into next shift).
    // v3.7.17 changes vs v3.7.16:
    //   - threshold lowered to length >= 2 (was >= 3) — now ALL multi-product
    //     shifts qualify, not just 3+-product ones.
    //   - loop now scans products[1..length-1] (was 1..length-2) — the LAST
    //     tail product is also a candidate (this was the v3.7.14/15 bug:
    //     pictures showed the 7-db Ring being the LAST product of a 2-product
    //     shift, but the loop's `length - 2` start skipped it).
    //   - capacity check via _canFit on the target machine (no over-allocation).
    //   - threshold semantics: pct is now an aggressiveness slider, not a
    //     hard cutoff. Default 100 = always try (subject to capacity). A lower
    //     pct only moves a fragment if it's still small relative to the
    //     SOURCE machine's totalQty (legacy behaviour). 0 disables.
    _consolidateMultiProductFragments(dailyPlan, area, machines, availMinPerShift) {
        if (!dailyPlan || dailyPlan.length === 0) return;
        const rawPct = (area && area.consolidationThresholdPct != null)
            ? +area.consolidationThresholdPct : 100;
        if (!(rawPct > 0)) return; // 0 (or NaN/negative) disables the pass
        const pct = Math.max(0, Math.min(100, rawPct)) / 100;

        const _machByName = {};
        if (machines) for (const mm of machines) _machByName[mm.name] = mm;

        const _targetUsedMin = (other) => {
            const tm = _machByName[other.machineName];
            if (!tm) return Infinity;
            let used = 0;
            for (const p of (other.products || [])) {
                const ct = this._getCT(tm, p.productName, tm.cycleTime);
                if (ct > 0) used += (p.qty || 0) * ct;
            }
            return used;
        };
        const _canFit = (other, productName, qty) => {
            // If we don't have machines/availMinPerShift context, fall back to
            // the pre-v3.7.17 behaviour (no capacity check). This preserves
            // backward-compatibility for any caller that didn't pass them.
            if (!machines || !availMinPerShift) return true;
            const tm = _machByName[other.machineName];
            if (!tm) return false;
            if (!this._machineCanProduce(tm, productName)) return false;
            const ct = this._getCT(tm, productName, tm.cycleTime);
            if (ct <= 0) return false;
            return _targetUsedMin(other) + qty * ct <= availMinPerShift;
        };

        for (let ei = 0; ei < dailyPlan.length; ei++) {
            const entry = dailyPlan[ei];
            if (entry.isPast) continue;
            const machEntries = entry.machines;
            if (!machEntries || machEntries.length < 2) continue;
            let changed = true;
            let safety = 0;
            while (changed && safety++ < 50) {
                changed = false;
                for (let mi = 0; mi < machEntries.length && !changed; mi++) {
                    const m = machEntries[mi];
                    if (!m.products || m.products.length < 2) continue; // v3.7.17: was 3
                    if (m.isDown) continue;
                    const totalQty = m.products.reduce((s, p) => s + (p.qty || 0), 0);
                    if (totalQty <= 0) continue;
                    // v3.7.17: scan ALL non-primary products [1..length-1], including the last.
                    // (Pre-v3.7.17 stopped at length-2, skipping the tail.)
                    for (let pi = m.products.length - 1; pi >= 1; pi--) {
                        const frag = m.products[pi];
                        if (!frag || (frag.qty || 0) <= 0) continue;
                        // Aggressiveness gate: at pct=100 this is always true
                        // (a tail is always < totalQty). Lower pct only moves
                        // genuinely small tails.
                        if (frag.qty >= totalQty * pct) continue;
                        let moved = false;
                        // Strategy A: another machine in SAME shift already has this product
                        for (let mj = 0; mj < machEntries.length && !moved; mj++) {
                            if (mi === mj) continue;
                            const other = machEntries[mj];
                            if (!other.products || other.products.length === 0) continue;
                            if (other.isDown) continue;
                            const existing = other.products.find(p => p.productName === frag.productName);
                            if (!existing) continue;
                            if (!_canFit(other, frag.productName, frag.qty)) continue;
                            existing.qty += frag.qty;
                            if (frag.buckets && existing.buckets) {
                                for (const b of frag.buckets) {
                                    if (!existing.buckets.includes(b)) existing.buckets.push(b);
                                }
                            }
                            m.products.splice(pi, 1);
                            m.productName = m.products[0].productName;
                            m.qty = m.products[0].qty;
                            moved = true; changed = true;
                        }
                        // Strategy B: another machine's PREVIOUS shift ended with this product
                        if (!moved && ei > 0) {
                            const prevEntry = dailyPlan[ei - 1];
                            if (prevEntry && !prevEntry.isPast) {
                                for (let mj = 0; mj < machEntries.length && !moved; mj++) {
                                    if (mi === mj) continue;
                                    const otherCurr = machEntries[mj];
                                    if (!otherCurr.products || otherCurr.products.length === 0) continue;
                                    if (otherCurr.isDown) continue;
                                    const prevMach = prevEntry.machines.find(pm => pm.machineName === otherCurr.machineName);
                                    if (!prevMach || !prevMach.products || prevMach.products.length === 0) continue;
                                    const prevLast = prevMach.products[prevMach.products.length - 1];
                                    if (prevLast.productName !== frag.productName) continue;
                                    if (!_canFit(otherCurr, frag.productName, frag.qty)) continue;
                                    if (otherCurr.products[0].productName === frag.productName) {
                                        otherCurr.products[0].qty += frag.qty;
                                        if (frag.buckets && otherCurr.products[0].buckets) {
                                            for (const b of frag.buckets) {
                                                if (!otherCurr.products[0].buckets.includes(b)) otherCurr.products[0].buckets.push(b);
                                            }
                                        }
                                    } else {
                                        otherCurr.products.unshift({
                                            productName: frag.productName, qty: frag.qty,
                                            colorIdx: frag.colorIdx, bucket: frag.bucket,
                                            bucketLabel: frag.bucketLabel,
                                            buckets: frag.buckets ? [...frag.buckets] : []
                                        });
                                        otherCurr.productName = frag.productName;
                                        otherCurr.qty = frag.qty;
                                    }
                                    m.products.splice(pi, 1);
                                    m.productName = m.products[0].productName;
                                    m.qty = m.products[0].qty;
                                    moved = true; changed = true;
                                }
                            }
                        }
                        // Strategy C: NEXT shift on another machine starts with this product
                        if (!moved && ei + 1 < dailyPlan.length) {
                            const nextEntry = dailyPlan[ei + 1];
                            if (nextEntry && !nextEntry.isPast) {
                                for (let mj = 0; mj < machEntries.length && !moved; mj++) {
                                    if (mi === mj) continue;
                                    const otherCurr = machEntries[mj];
                                    if (!otherCurr.products || otherCurr.products.length === 0) continue;
                                    if (otherCurr.isDown) continue;
                                    const nextMach = nextEntry.machines.find(nm => nm.machineName === otherCurr.machineName);
                                    if (!nextMach || !nextMach.products || nextMach.products.length === 0) continue;
                                    if (nextMach.products[0].productName !== frag.productName) continue;
                                    if (!_canFit(otherCurr, frag.productName, frag.qty)) continue;
                                    const lastProd = otherCurr.products[otherCurr.products.length - 1];
                                    if (lastProd.productName === frag.productName) {
                                        lastProd.qty += frag.qty;
                                        if (frag.buckets && lastProd.buckets) {
                                            for (const b of frag.buckets) {
                                                if (!lastProd.buckets.includes(b)) lastProd.buckets.push(b);
                                            }
                                        }
                                    } else {
                                        otherCurr.products.push({
                                            productName: frag.productName, qty: frag.qty,
                                            colorIdx: frag.colorIdx, bucket: frag.bucket,
                                            bucketLabel: frag.bucketLabel,
                                            buckets: frag.buckets ? [...frag.buckets] : []
                                        });
                                    }
                                    m.products.splice(pi, 1);
                                    m.productName = m.products[0].productName;
                                    m.qty = m.products[0].qty;
                                    moved = true; changed = true;
                                }
                            }
                        }
                        if (moved) break;
                    }
                }
            }
        }
    }

    // Classify deliveries into current-week and next-week based on date.
    // v3.6.1: classify by ISO week of the delivery date directly, NOT by
    // membership in _getPlanWorkdays() — that previously defaulted to Mon-Fri,
    // so Saturday/Sunday delivery dates fell out of both buckets and silently
    // demoted to "weekly goal" (e.g. GS20 delivery on Sat 2026-05-16 was lost).
    _classifyDeliveries(deliveries) {
        const curWeekNum = this.currentWeekNum;
        const nxtWeekNum = this.nextWeekNum || (curWeekNum >= 52 ? 1 : curWeekNum + 1);
        let curDel = 0, nxtDel = 0;
        let curEarliestDate = null, nxtEarliestDate = null;
        for (const d of deliveries) {
            if (!d.qty || d.qty <= 0) continue;
            // Compute ISO week from delivery date string (YYYY-MM-DD).
            let dWeek = null;
            if (d.date) {
                const parts = String(d.date).slice(0, 10).split('-');
                if (parts.length === 3) {
                    const dt = new Date(+parts[0], +parts[1] - 1, +parts[2]);
                    if (!isNaN(dt.getTime())) dWeek = this._getISOWeek(dt);
                }
            }
            if (dWeek === nxtWeekNum) {
                nxtDel += d.qty;
                if (!nxtEarliestDate || d.date < nxtEarliestDate) nxtEarliestDate = d.date;
            } else if (dWeek === curWeekNum || !d.date) {
                // No date -> treat as current-week (manual entry without date).
                curDel += d.qty;
                if (d.date && (!curEarliestDate || d.date < curEarliestDate)) curEarliestDate = d.date;
            }
            // else: past-week or far-future delivery — skip it
        }
        return { curWeekDelivery: curDel, nxtWeekDelivery: nxtDel, curEarliestDate: curEarliestDate, nxtEarliestDate: nxtEarliestDate };
    }

    // ============================================================
    // PULL-PRINCIPLE PLANNING ALGORITHM
    // ============================================================
    // Planning order: LAST area first (Lézer), then backwards (CNC, SMT)
    // Each area's needs are driven by the DOWNSTREAM area's plan.
    //
    // Last area (Lézer): plans from goals + deliveries (as before)
    // Middle area (CNC): plans what the downstream area (Lézer) needs,
    //   considering the buffer between them (Puffer 5) and shift offset
    // First area (SMT): plans what CNC needs, considering Puffer 4 + shift offset
    // ============================================================
    _calculateAreaPlan(area) {
        // Return cached plan if available
        if (this._planCache && this._planCache[area.id]) return this._planCache[area.id];

        const chain = this._getProductionChain();
        const chainIdx = chain.findIndex(c => c.area.id === area.id);
        // v3.3.75 DIAG (extended in v3.3.77): capture chain + per-area info for the
        // on-screen overlay, plus orphan areas' afterIds and BFS result.
        try {
            if (!this._diagPlanInfo) this._diagPlanInfo = { chain: [], areas: {}, orphans: {} };
            if (!this._diagPlanInfo.orphans) this._diagPlanInfo.orphans = {};
            if (!this._diagPlanInfo.chain.length) {
                this._diagPlanInfo.chain = chain.map((c, i) => ({
                    idx: i,
                    name: c.area.customName || c.area.name || c.area.id,
                    type: c.area.type,
                    machines: (c.area.machines || []).map(m => m.name),
                    afterIds: (c.area.afterAreaIds || []),
                    beforeIds: (c.area.beforeAreaIds || []),
                    bufferAfter: c.bufferAfter ? (c.bufferAfter.customName || c.bufferAfter.name || c.bufferAfter.id) : null,
                    qualitySides: (c.qualityAreas || []).map(qa => qa.customName || qa.name || qa.id)
                }));
            }
            // Extra: for orphan areas, capture afterIds + BFS-resolved downstream
            if (chainIdx === -1) {
                const _aname = area.customName || area.name || area.id;
                const _ds77 = this._findDownstreamForArea(area);
                this._diagPlanInfo.orphans[_aname] = {
                    afterIds: (area.afterAreaIds || []),
                    beforeIds: (area.beforeAreaIds || []),
                    resolvedDownstream: _ds77 ? (_ds77.downstreamArea.customName || _ds77.downstreamArea.name || _ds77.downstreamArea.id) : null,
                    resolvedBuffer: _ds77 && _ds77.bufferAfter ? (_ds77.bufferAfter.customName || _ds77.bufferAfter.name || _ds77.bufferAfter.id) : null
                };
            }
        } catch (_de) {}
        const isOrphan = chainIdx === -1;

        const machines = area.machines || [];
        if (machines.length === 0) return null;

        // v3.3.76: resolve THIS area's downstream and last-area status.
        //   - If chainIdx === chain.length-1  -> LAST in chain (true bottleneck, e.g. QI).
        //   - If chainIdx >= 0 (mid chain)    -> downstream = chain[chainIdx+1].
        //   - If isOrphan                     -> BFS via afterIds to find a chain-area
        //                                        downstream. If none found, return null
        //                                        (no own goals, no plan -- empty).
        let _resolvedDownstreamArea = null;
        let _resolvedBufferAfter = null;
        let isLastArea;
        if (chainIdx >= 0 && chainIdx === chain.length - 1) {
            isLastArea = true;
            // v3.7.45: a buffer AFTER the last area (finished-goods store, if any) — used
            // to offset DELIVERY demand (those units are already made), never the goal.
            _resolvedBufferAfter = chain[chainIdx].bufferAfter || null;
        } else if (chainIdx >= 0) {
            isLastArea = false;
            _resolvedDownstreamArea = chain[chainIdx + 1].area;
            _resolvedBufferAfter = chain[chainIdx].bufferAfter || null;
        } else {
            const _ds = this._findDownstreamForArea(area);
            if (_ds) {
                isLastArea = false;
                _resolvedDownstreamArea = _ds.downstreamArea;
                _resolvedBufferAfter = _ds.bufferAfter;
            } else {
                // No downstream reachable -- pure pull says zero. Empty plan, no
                // fall-back to own goals.
                return null;
            }
        }

        // === v3.3.83: DELEGATE MAINSTREAM TO CLEAN IMPLEMENTATION ===
        // Skip ALL the old accumulated mainstream logic below. Pure pull only.
        if (!isLastArea && _resolvedDownstreamArea) {
            const _mp = this._calculateMainstreamAreaPlan(area, _resolvedDownstreamArea, _resolvedBufferAfter);
            if (_mp) {
                if (!this._planCache) this._planCache = {};
                this._planCache[area.id] = _mp;
            }
            return _mp;
        }

        // Detect quality areas connected to this chain link (side-constraint)
        const chainEntry = isOrphan ? null : chain[chainIdx];
        const qualityAreas = (chainEntry && chainEntry.qualityAreas) ? chainEntry.qualityAreas : [];
        // Build quality throughput map: productName → max qty per shift
        const qualityMaxPerShift = {};
        for (const qa of qualityAreas) {
            const qp = qa.qualityProducts || [];
            if (qp.length === 0) continue;
            const qaShiftMins = this.getShiftMinutes(qa);
            const qaStops = this.getTotalPlannedStop(qa);
            const qaAvail = Math.max(0, qaShiftMins - qaStops);
            for (const p of qp) {
                if (p.cycleTime > 0 && qaAvail > 0) {
                    const maxQty = Math.floor(qaAvail / p.cycleTime);
                    // If multiple quality areas check same product, take minimum
                    if (qualityMaxPerShift[p.name] === undefined || maxQty < qualityMaxPerShift[p.name]) {
                        qualityMaxPerShift[p.name] = maxQty;
                    }
                }
            }
        }

        const totalProdAreas = chain.length;
        // v3.3.26: default offset for new areas is 1 (= 1 shift before its next area)
        const configuredOffset = area.shiftSettings?.shiftOffset ?? (isOrphan ? 0 : 1);
        // v3.3.76: isLastArea + downstream resolved earlier under the strict pull-only rules.

        const shiftMins = this.getShiftMinutes(area);
        const stops = this.getTotalPlannedStop(area);
        const shiftCount = area.shiftSettings?.shiftCount || 1;
        const availMinPerShift = Math.max(0, shiftMins - stops);
        if (availMinPerShift === 0) return null;

        // --- PULL PRINCIPLE: ensure downstream area is planned first ---
        let downstreamDemand = null; // { perSlot: [{productName, qty}], initialBuffer: {product->qty} }
        if (!isLastArea) {
            // v3.3.76: downstream + buffer come from the resolved values above
            // (handles parallel-branch orphans like Hard Turning Pinion).
            const downstreamArea = _resolvedDownstreamArea;
            const downstreamPlan = this._calculateAreaPlan(downstreamArea);

            // Get buffer between this area and the downstream area
            const bufAfter = _resolvedBufferAfter;
            const pufIdx = bufAfter?.selectedPufferIdx || 0;
            const pufData = this.dataPuffers?.[pufIdx];
            const initialBuffer = {};
            if (pufData && pufData.data) {
                for (const pName of Object.keys(pufData.data)) {
                    initialBuffer[pName] = pufData.data[pName] || 0;
                }
            }

            // v3.3.26: shiftOffset is stored RELATIVE TO THE NEXT (downstream) area.
            // So the stored value IS the relative offset between this area and downstream.
            const relativeOffset = Math.max(0, configuredOffset);

            if (downstreamPlan) {
                // Build per-slot demand from downstream plan (what the downstream area consumes per shift)
                const downNonPast = downstreamPlan.dailyPlan.filter(s => !s.isPast);
                const perSlotDemand = [];
                for (const slot of downNonPast) {
                    const slotProducts = {};
                    for (const mach of slot.machines) {
                        if (mach.qty > 0 && mach.productName && mach.productName !== "-") {
                            const _pname = mach.productName;
                            slotProducts[_pname] = (slotProducts[_pname] || 0) + mach.qty;
                            // v3.3.38: BOM explosion. If this product is a parent in BOM,
                            // also raise demand for each of its components by qty * QtyPer.
                            // This is what makes upstream component-area scheduling pull from
                            // downstream parent-area scheduling correctly (Hard Turning pulls
                            // from Testing's GS** schedule by exploding into PIN-/RING-** demand).
                            if (this.bomMap && this.bomMap[_pname]) {
                                for (const _comp in this.bomMap[_pname]) {
                                    const _qp = this.bomMap[_pname][_comp] || 1;
                                    slotProducts[_comp] = (slotProducts[_comp] || 0) + mach.qty * _qp;
                                }
                            }
                        }
                    }
                    perSlotDemand.push(slotProducts);
                }

                // v3.3.46: per-product routing override.
                // For products with a custom downstream routing (area.productRouting), recompute
                // their slot demand from the ROUTED downstream area's plan instead of the default
                // chain follower. This handles diverging flows like Teeth Cutting → Carb Stop
                // (ring) AND Teeth Cutting → Furnace (pinion) directly.
                const _routing = area.productRouting || {};
                const _routingGroupKey = area.routingGroupKey || "";
                const _typeLevelMap = this.productTypeLevelMap || {};
                const _routingKeyOf = (productName) => {
                    if (!_routingGroupKey) return productName;
                    const _entry = _typeLevelMap[productName] || {};
                    const _v = _entry[_routingGroupKey];
                    return (_v != null && _v !== "") ? String(_v) : productName;
                };
                const _routedAreaIds = [...new Set(Object.values(_routing))].filter(Boolean);
                for (const _routedId of _routedAreaIds) {
                    const _routedArea = this.areas.find(a => a.id === _routedId);
                    if (!_routedArea || _routedArea.type !== "production") continue;
                    if (_routedArea.id === downstreamArea.id) continue; // already in default pull
                    const _routedPlan = this._calculateAreaPlan(_routedArea);
                    if (!_routedPlan) continue;
                    const _routedNonPast = _routedPlan.dailyPlan.filter(s => !s.isPast);
                    const _productsToRoute = this.dataProducts.map(dp => dp.name).filter(pn => _routing[_routingKeyOf(pn)] === _routedId);
                    if (_productsToRoute.length === 0) continue;
                    // Reset routed products' demand in default perSlotDemand
                    for (const _pn of _productsToRoute) {
                        for (let si = 0; si < perSlotDemand.length; si++) {
                            perSlotDemand[si][_pn] = 0;
                        }
                    }
                    // Accumulate from routed plan (with BOM explosion at slot level)
                    for (let si = 0; si < _routedNonPast.length && si < perSlotDemand.length; si++) {
                        const _slot = _routedNonPast[si];
                        for (const mach of _slot.machines) {
                            if (mach.qty <= 0 || !mach.productName || mach.productName === "-") continue;
                            const _mName = mach.productName;
                            // Direct match
                            if (_productsToRoute.includes(_mName)) {
                                perSlotDemand[si][_mName] = (perSlotDemand[si][_mName] || 0) + mach.qty;
                            }
                            // BOM explosion: routed product is a component of mach.productName
                            if (this.bomMap && this.bomMap[_mName]) {
                                for (const _comp of _productsToRoute) {
                                    const _qp = this.bomMap[_mName][_comp] || 0;
                                    if (_qp > 0) {
                                        perSlotDemand[si][_comp] = (perSlotDemand[si][_comp] || 0) + mach.qty * _qp;
                                    }
                                }
                            }
                        }
                    }
                }

                // Build cumulative demand from downstream (what downstream needs by each slot)
                const cumDemand = {}; // productName -> [cumulative qty needed by slot 0, 1, 2, ...]
                for (let si = 0; si < perSlotDemand.length; si++) {
                    for (const [pName, qty] of Object.entries(perSlotDemand[si])) {
                        if (!cumDemand[pName]) cumDemand[pName] = new Array(perSlotDemand.length).fill(0);
                        cumDemand[pName][si] += qty;
                    }
                }
                for (const prod of Object.keys(cumDemand)) {
                    for (let i = 1; i < cumDemand[prod].length; i++) {
                        cumDemand[prod][i] += cumDemand[prod][i - 1];
                    }
                }

                downstreamDemand = { cumDemand, initialBuffer, relativeOffset, totalSlots: perSlotDemand.length };
            }
        }

        // --- BUILD PRODUCT NEEDS ---
        // Last area: needs = goals + deliveries - produced
        // Non-last areas: needs = what downstream needs (cumulative total) - buffer stock
        const productNeeds = [];

        if (isLastArea) {
            // v3.7.45: finished-goods buffer AFTER the last area (if any). It can satisfy
            // DELIVERY (the units already exist in the store), but NOT the weekly GOAL —
            // the last area must still produce its full goal regardless of finished stock.
            const _fgPufIdx = _resolvedBufferAfter ? (_resolvedBufferAfter.selectedPufferIdx || 0) : -1;
            const _fgPufData = _fgPufIdx >= 0 ? (this.dataPuffers && this.dataPuffers[_fgPufIdx]) : null;
            const _fgStockOf = (nm) => (_fgPufData && _fgPufData.data) ? (_fgPufData.data[nm] || 0) : 0;
            // LAST AREA: plan from goals and deliveries (original logic)
            for (const dp of this.dataProducts) {
                const goals = this.getGoals(dp.name);
                const goalThisWeek = goals.goalThisWeek || 0;
                const goalNextWeek = goals.goalNextWeek || 0;
                const deliveries = goals.deliveries || [];
                const { curWeekDelivery, nxtWeekDelivery, curEarliestDate, nxtEarliestDate } = this._classifyDeliveries(deliveries);

                if (goalThisWeek === 0 && goalNextWeek === 0) continue;

                // Only plan this product here if the area has at least one machine that can produce it
                // (supports parallel chains: components are produced in their own chain, not the final-assembly chain)
                const canProduceHere = machines.some(m => this._machineCanProduce(m, dp.name));
                if (!canProduceHere) continue;

                const produced = dp.producedQty || 0;
                const totalCurRemaining = Math.max(0, goalThisWeek - produced);
                // v3.7.45: subtract the finished-goods buffer from the DELIVERY need only.
                // The total still produced (totalCurRemaining) is goal-bound and unchanged;
                // the buffer just reclassifies covered delivery units as plain goal units.
                const _fgStock = _fgStockOf(dp.name);
                const effectiveCurDelivery = Math.min(curWeekDelivery, goalThisWeek);
                const curDeliveryRemaining = Math.max(0, Math.min(effectiveCurDelivery - produced - _fgStock, totalCurRemaining));
                const curGoalRemaining = Math.max(0, totalCurRemaining - curDeliveryRemaining);
                // leftover finished stock (after covering this week's delivery) rolls to next week
                const _fgLeft = Math.max(0, _fgStock - Math.max(0, effectiveCurDelivery - produced));
                const effectiveNxtDelivery = Math.min(nxtWeekDelivery, goalNextWeek);
                const nxtDeliveryRemaining = Math.max(0, effectiveNxtDelivery - _fgLeft);
                const nxtGoalRemaining = Math.max(0, goalNextWeek - nxtDeliveryRemaining);

                productNeeds.push({
                    name: dp.name,
                    curDelivery: curDeliveryRemaining, curGoal: curGoalRemaining,
                    nxtDelivery: nxtDeliveryRemaining, nxtGoal: nxtGoalRemaining,
                    curDeliveryOrig: curDeliveryRemaining, curGoalOrig: curGoalRemaining,
                    nxtDeliveryOrig: nxtDeliveryRemaining, nxtGoalOrig: nxtGoalRemaining,
                    curDeliveryDate: curEarliestDate, nxtDeliveryDate: nxtEarliestDate
                });
            }
        } else {
            // NON-LAST AREA (pull principle): needs driven STRICTLY by downstream plan.
            // v3.3.73: mainstream areas have NO own goals -- no getGoals() / no own
            // delivery dates. Demand is solely what downstream actually pulls (cumDemand
            // and downstream's productNeeds). If downstream pulls zero, this area plans
            // zero for that product, regardless of any heading own week goal.
            for (const dp of this.dataProducts) {
                let totalDownstreamNeed = 0;
                if (downstreamDemand && downstreamDemand.cumDemand[dp.name]) {
                    const arr = downstreamDemand.cumDemand[dp.name];
                    totalDownstreamNeed = arr[arr.length - 1] || 0;
                }
                // v3.3.77: v3.3.25 Orig-fallback DISABLED for pure pull.
                // Was: if downstream's productNeeds Orig totals exceeded cumDemand
                //      (capacity-limited downstream), use Orig instead so the full
                //      residual goal would cascade upstream.
                // Now: pure pull -- upstream plans EXACTLY what downstream actually
                //      scheduled (cumDemand). If downstream is capacity-bound and
                //      can't process the full goal, upstream produces less (matching
                //      what flows through), not more. This is the user's "no own goals"
                //      contract: each area plans only what its downstream pulls.
                const bufferStock = downstreamDemand ? (downstreamDemand.initialBuffer[dp.name] || 0) : 0;
                let totalNeed = Math.max(0, totalDownstreamNeed - bufferStock);

                // v3.3.72: v3.3.17 branch-aware fallback DISABLED for non-last areas.
                // Mainstream areas now strictly follow the pull principle: if downstream
                // doesn't pull a product, the mainstream area does not plan it -- even if
                // the product has its own week goal. The previous fallback caused mainstream
                // areas (e.g. Phosphate) to plan products their downstream (e.g. Quality
                // Inspection) was already satisfied with, instead of pulling what downstream
                // actually consumes. Parallel/orphan branches are handled by the
                // isLastArea=isOrphan path which uses goal-based scoring.

                if (totalNeed === 0) continue;

                // v3.3.73: bucket distribution from downstream's productNeeds proportions.
                // Mainstream areas inherit bucket structure (curDelivery / curGoal / nxtDelivery
                // / nxtGoal) from downstream so display labels match. No own-goal fallback --
                // if downstream has no bucket info, everything goes to curGoal and the
                // bucket-promote logic relabels next-week slots.
                const downPlan = this._planCache?.[_resolvedDownstreamArea ? _resolvedDownstreamArea.id : null];
                let curDel = 0, curGoal = 0, nxtDel = 0, nxtGoal = 0;
                let _bucketed = false;
                if (downPlan) {
                    let downPN = downPlan.productNeeds.find(p => p.name === dp.name);
                    // v3.3.38: if dp is a component, aggregate parent productNeeds via BOM
                    if (!downPN && this.bomMap) {
                        let agg = null;
                        for (const _parent in this.bomMap) {
                            const _qp = this.bomMap[_parent][dp.name] || 0;
                            if (_qp <= 0) continue;
                            const _parentPN = downPlan.productNeeds.find(p => p.name === _parent);
                            if (!_parentPN) continue;
                            if (!agg) agg = { name: dp.name, curDeliveryOrig: 0, curGoalOrig: 0, nxtDeliveryOrig: 0, nxtGoalOrig: 0 };
                            agg.curDeliveryOrig += (_parentPN.curDeliveryOrig || 0) * _qp;
                            agg.curGoalOrig    += (_parentPN.curGoalOrig    || 0) * _qp;
                            agg.nxtDeliveryOrig += (_parentPN.nxtDeliveryOrig || 0) * _qp;
                            agg.nxtGoalOrig    += (_parentPN.nxtGoalOrig    || 0) * _qp;
                        }
                        downPN = agg;
                    }
                    if (downPN) {
                        const downTotal = (downPN.curDeliveryOrig || 0) + (downPN.curGoalOrig || 0) + (downPN.nxtDeliveryOrig || 0) + (downPN.nxtGoalOrig || 0);
                        if (downTotal > 0) {
                            curDel = Math.round(totalNeed * (downPN.curDeliveryOrig / downTotal));
                            curGoal = Math.round(totalNeed * (downPN.curGoalOrig / downTotal));
                            nxtDel = Math.round(totalNeed * (downPN.nxtDeliveryOrig / downTotal));
                            nxtGoal = Math.max(0, totalNeed - curDel - curGoal - nxtDel);
                            _bucketed = true;
                        }
                    }
                }
                if (!_bucketed) {
                    // v3.3.73: no own-goal fallback for mainstream. If downstream doesn't
                    // provide bucket proportions, default all pulled qty to curGoal -- the
                    // v3.3.41 bucket-promote logic relabels slots that reach the bottleneck
                    // in next week. Mainstream never reads getGoals() here.
                    curGoal = totalNeed;
                }

                productNeeds.push({
                    name: dp.name,
                    curDelivery: curDel, curGoal: curGoal,
                    nxtDelivery: nxtDel, nxtGoal: nxtGoal,
                    curDeliveryOrig: curDel, curGoalOrig: curGoal,
                    nxtDeliveryOrig: nxtDel, nxtGoalOrig: nxtGoal,
                    // v3.3.73: mainstream has no own delivery dates -- dates inherited
                    // from downstream's productNeeds when bucketed.
                    curDeliveryDate: null, nxtDeliveryDate: null
                });
            }
        }

        // v3.3.75 DIAG (extended in v3.3.79): per-area branch + cumDemand top
        try {
            if (!this._diagPlanInfo) this._diagPlanInfo = { chain: [], areas: {} };
            const _aname = area.customName || area.name || area.id;
            const _topNeeds = productNeeds
                .map(p => ({ name: p.name, total: (p.curDelivery||0) + (p.curGoal||0) + (p.nxtDelivery||0) + (p.nxtGoal||0) }))
                .sort((a, b) => b.total - a.total)
                .slice(0, 8);
            const _downName = (!isLastArea && _resolvedDownstreamArea) ?
                (_resolvedDownstreamArea.customName || _resolvedDownstreamArea.name) : null;
            // v3.3.79: also dump top cumDemand items (raw downstream pull) so we can
            // distinguish "pull is correct, productNeeds reflects it" from "pull is zero
            // but productNeeds inflated by some leftover fallback".
            let _topCum = [];
            try {
                if (downstreamDemand && downstreamDemand.cumDemand) {
                    const _cd = downstreamDemand.cumDemand;
                    const _entries = Object.keys(_cd).map(k => ({
                        name: k,
                        total: (_cd[k] && _cd[k].length > 0) ? (_cd[k][_cd[k].length - 1] || 0) : 0
                    }));
                    _topCum = _entries.sort((a, b) => b.total - a.total).slice(0, 10);
                }
            } catch (_ce) {}
            this._diagPlanInfo.areas[_aname] = {
                type: area.type,
                chainIdx: chainIdx,
                isOrphan: isOrphan,
                isLastArea: isLastArea,
                downstream: _downName,
                productNeedsCount: productNeeds.length,
                topNeeds: _topNeeds,
                topCumDemand: _topCum
            };
        } catch (_de) {}
        if (productNeeds.length === 0) return null;

        // Priority order of bucket keys
        const priorityBuckets = ["curDelivery", "curGoal", "nxtDelivery", "nxtGoal"];
        const bucketLabels = {
            curDelivery: "curWeekDelivery",
            curGoal: "curWeekGoal",
            nxtDelivery: "nxtWeekDelivery",
            nxtGoal: "nxtWeekGoal"
        };

        // Workdays (area-specific: continuous shifts include weekends)
        const wdpw = this._getAreaWorkDaysPerWeek(area);
        const allDays = this._getPlanWorkdays(wdpw);
        const curWeekNum = this.currentWeekNum;
        const nxtWeekNum = this.nextWeekNum || (curWeekNum >= 52 ? 1 : curWeekNum + 1);
        const curWeekDays = allDays.filter(d => d.week === curWeekNum);
        const nxtWeekDays = allDays.filter(d => d.week === nxtWeekNum);
        const effectiveCurDays = curWeekDays.length;

        // If no future workdays remain in current week, zero out curWeek buckets
        const futureCurWeekDays = curWeekDays.filter(d => !d.isPast);
        if (futureCurWeekDays.length === 0) {
            for (const p of productNeeds) {
                p.curDelivery = 0; p.curGoal = 0;
                p.curDeliveryOrig = 0; p.curGoalOrig = 0;
            }
        }

        const allProductNames = productNeeds.map(p => p.name);
        // v3.7.21: theme-aware palette (matched by index to the dark palette).
        const planColors = this._getPlanColors();

        const shiftLabel = this.language === "hu" ? "M" : "S";
        const dailyPlan = [];
        const allScheduleDays = [...curWeekDays, ...nxtWeekDays];

        // For non-last areas: track cumulative downstream demand to align timing
        let nonPastSlotIdx = -1;
        const scheduledPerProduct = {};
        // Track last product per machine to minimize changeovers across shifts
        const lastProductOnMachine = {};

        // v3.3.27: TRUE pull MRP. This area produces at slot K; output is consumable
        // by downstream at slot K + relativeOffset. So this area's CUMULATIVE production
        // obligation by its slot K = downstream cumulative demand through slot (K + offset),
        // minus the initial buffer (which serves the first `offset` downstream slots).
        // The previous formula (slotIdx - relativeOffset) had the wrong sign, causing
        // upstream areas to look BACKWARDS in time and miss real downstream demand.
        const _getDownstreamCumDemandBySlot = (productName, slotIdx) => {
            if (!downstreamDemand) return Infinity;
            const { cumDemand, initialBuffer, relativeOffset } = downstreamDemand;
            const downSlot = slotIdx + relativeOffset;
            const buf = initialBuffer[productName] || 0;
            if (!cumDemand[productName]) return 0;
            // If downSlot is past the end of downstream's plan, use the last cumulative value
            const arr = cumDemand[productName];
            const clampedIdx = Math.min(downSlot, arr.length - 1);
            const needed = clampedIdx >= 0 ? arr[clampedIdx] : 0;
            return Math.max(0, needed - buf);
        };

        for (let di = 0; di < allScheduleDays.length; di++) {
            const day = allScheduleDays[di];
            const isCurWeek = day.week === curWeekNum;
            // v3.3.24 (updated v3.3.26): offset-aware targetWeek.
            // Each area's stored shiftOffset is the offset to its IMMEDIATE NEXT area.
            // Walk the chain forward and sum to get cumulative offset to the last area.
            const _slotsPerDay = shiftCount || 1;
            const _offsetFromLast = (function () {
                if (isOrphan || chainIdx < 0) return 0;
                let total = 0;
                for (let _i = chainIdx; _i < chain.length - 1; _i++) {
                    total += (chain[_i].area.shiftSettings?.shiftOffset || 0);
                }
                return total;
            })();
            const _consumeDayIdx = di + Math.floor(_offsetFromLast / _slotsPerDay);
            const _consumeDay = allScheduleDays[_consumeDayIdx];
            const _consumeWeek = _consumeDay ? _consumeDay.week : nxtWeekNum;
            const isNextWeekWork = isCurWeek && (_consumeWeek !== curWeekNum);
            const targetWeek = (_consumeWeek === curWeekNum) ? "this" : "next";
            // Per-slot bucket priority — swap to next-week first when this slot's
            // production reaches the final area in the next calendar week.
            // v3.5.1: drain ONLY same-week buckets so last area doesn't cascade W19 goals
            // into W20 slots (per spec 6.3: "if next week goals not set, leave empty").
            // For W19 slot: only curDelivery + curGoal eligible.
            // For W20 slot: only nxtDelivery + nxtGoal eligible.
            const _priorityForSlotDay = targetWeek === "next"
                ? ["nxtDelivery", "nxtGoal"]
                : ["curDelivery", "curGoal"];

            for (let si = 0; si < shiftCount; si++) {
                // Reset quality blocked flags per shift
                for (const p of productNeeds) {
                    p._qualityBlocked = false;
                    p._satisfiedThisSlot = false;  // v3.3.28
                }

                // v3.7.14: OVERFLOW-FILL for cur-week slots.
                // When ALL cur-week buckets are drained (this-week goals + deliveries
                // already scheduled) but next-week needs remain, switch THIS slot to
                // next-week priority so empty cur-week shifts (typ. late Sat / Sun)
                // produce next-week goal instead of sitting idle.
                // Without this, Sunday last shifts go empty even though nxtGoal > 0
                // and the source file has next-week planning data.
                let _priorityForSlot = _priorityForSlotDay;
                let _slotIsNxtFill = false;
                if (targetWeek === "this") {
                    const _curRemain = productNeeds.some(p =>
                        (p.curDelivery || 0) > 0 || (p.curGoal || 0) > 0);
                    const _nxtRemain = productNeeds.some(p =>
                        (p.nxtDelivery || 0) > 0 || (p.nxtGoal || 0) > 0);
                    if (!_curRemain && _nxtRemain) {
                        _priorityForSlot = ["nxtDelivery", "nxtGoal"];
                        _slotIsNxtFill = true;
                    }
                }

                const shiftEntry = {
                    dayLabel: day.dayLabel,
                    shiftLabel: shiftCount > 1 ? (shiftLabel + (si + 1)) : "",
                    shiftIdx: si,
                    dateStr: day.dateStr,
                    week: day.week,
                    targetWeek: targetWeek,
                    isNextWeekGoal: (targetWeek === "next") || _slotIsNxtFill,
                    isPast: day.isPast,
                    isToday: day.isToday,
                    isFirstShiftOfDay: si === 0,
                    machines: []
                };

                if (day.isPast) {
                    for (const m of machines) {
                        shiftEntry.machines.push({ machineName: m.name, productName: "-", qty: 0, colorIdx: -1, bucket: null, bucketLabel: null, products: [] });
                    }
                    dailyPlan.push(shiftEntry);
                    continue;
                }

                nonPastSlotIdx++;

                // v3.7+: machineGroupKey bind values for this shift (last-area path).
                // Same idea as the mainstream scheduler but uses productNeeds
                // (curDelivery+curGoal+nxtDelivery+nxtGoal) as the demand source.
                const _shiftTypeLevelMap2 = this.productTypeLevelMap || {};
                const _shiftGroupedMachines2 = {};
                for (const _gm of machines) {
                    if (!_gm.machineGroupKey) continue;
                    if (!_shiftGroupedMachines2[_gm.machineGroupKey]) _shiftGroupedMachines2[_gm.machineGroupKey] = [];
                    _shiftGroupedMachines2[_gm.machineGroupKey].push(_gm);
                }
                const _shiftGroupBindValue2 = {};
                for (const _gk in _shiftGroupedMachines2) {
                    const _grpMs = _shiftGroupedMachines2[_gk];
                    const _bindKey = _grpMs[0].machineGroupBindKey || "typeLevel2";
                    const _candidateScore = {};
                    for (const _p of productNeeds) {
                        const _rem = (_p.curDelivery || 0) + (_p.curGoal || 0) + (_p.nxtDelivery || 0) + (_p.nxtGoal || 0);
                        if (_rem <= 0) continue;
                        const _entry = _shiftTypeLevelMap2[_p.name] || {};
                        const _v = _entry[_bindKey];
                        if (_v == null || _v === "") continue;
                        let _canAny = false;
                        for (const _mm of _grpMs) {
                            if (this._machineCanProduce(_mm, _p.name)) { _canAny = true; break; }
                        }
                        if (!_canAny) continue;
                        const _key = String(_v);
                        _candidateScore[_key] = (_candidateScore[_key] || 0) + _rem;
                    }
                    let _bestV = null; let _bestS = 0;
                    for (const _k in _candidateScore) {
                        if (_candidateScore[_k] > _bestS) { _bestS = _candidateScore[_k]; _bestV = _k; }
                    }
                    if (_bestV !== null) _shiftGroupBindValue2[_gk] = _bestV;
                }

                for (const m of machines) {
                    const mDown = m.downtime?.[day.dateStr];
                    const isDown = mDown && (mDown.allDay || (mDown.shifts && mDown.shifts.includes(si)));
                    if (isDown) {
                        const reason = mDown.reason || "breakdown";
                        shiftEntry.machines.push({
                            machineName: m.name, productName: "-", qty: 0, colorIdx: -1,
                            bucket: null, bucketLabel: null, isDown: true, downReason: reason,
                            products: []
                        });
                        continue;
                    }
                    // v3.7+: this machine's group bind constraint (if any).
                    const _mgKey2 = m.machineGroupKey || null;
                    const _mgBindKey2 = m.machineGroupBindKey || "typeLevel2";
                    const _mgBindValue2 = _mgKey2 ? (_shiftGroupBindValue2[_mgKey2] || null) : null;
                    const _mgPassesBind2 = (productName) => {
                        if (!_mgKey2 || _mgBindValue2 === null) return true;
                        const _entry = _shiftTypeLevelMap2[productName] || {};
                        const _v = _entry[_mgBindKey2];
                        return _v != null && _v !== "" && String(_v) === _mgBindValue2;
                    };

                    // BATCH-OPTIMIZED SCHEDULING: minimize changeovers, maximize capacity
                    // v3.3.44: parallel lanes — a machine with parallelLanes > 1 can produce
                    // multiple products simultaneously (e.g. Shot Peen pinion + ring at once).
                    // Each lane has its own minute pool; products picked in lower lanes are
                    // excluded from higher lanes so lanes naturally pick different products.
                    const _laneCount = Math.max(1, parseInt(m.parallelLanes, 10) || 1);
                    const machineProducts = []; // [{productName, qty, colorIdx, bucket, bucketLabel, buckets}]
                    // v3.3.50: cross-lane DIFFERENTIATION uses a key that defaults hierarchically
                    // — when grouping by TL2, lanes differ by TL1 (so pinion+ring run in parallel,
                    // not pinion+pinion); when grouping by TL3, lanes differ by TL2; otherwise
                    // lanes differ by product name (legacy v3.3.44 behavior).
                    const _completedLaneDifferKeys = new Set();
                    // v3.3.49: lane grouping by user-selected key
                    // ("" / "parent" / "typeLevel1" / "typeLevel2" / "typeLevel3").
                    // Backwards compat: legacy m.sameParentLanes:true → "parent".
                    const _bomMapRef = this.bomMap || {};
                    const _typeLevelMap = this.productTypeLevelMap || {};
                    // v3.3.58: when parallelLanes > 1, auto-default the lane grouping to
                    // "parent" so pin+ring of the SAME gearset are paired on the same machine
                    // without manual format-pane config. _groupOf falls back to a name-pattern
                    // (last '-' segment) when BOM data role isn't bound.
                    const _autoParentGroup = (_laneCount > 1) ? "parent" : "";
                    const _laneGroupKey = m.laneGroupKey || (m.sameParentLanes ? "parent" : "") || _autoParentGroup;
                    let _machineGroupKey = null;
                    const _groupOf = (productName) => {
                        if (_laneGroupKey === "parent") {
                            for (const _parent in _bomMapRef) {
                                if (_bomMapRef[_parent] && _bomMapRef[_parent][productName] !== undefined) return _parent;
                            }
                            // v3.3.58: name-pattern fallback when BOM data role isn't bound.
                            // "PIN-GS14" / "RING-GS14" -> "GS14" (substring after last '-').
                            // Lets pin+ring of the same gearset pair on the same machine
                            // even without a bound BOM Parent / Component data role.
                            const _idx = String(productName).lastIndexOf('-');
                            if (_idx >= 0) return String(productName).slice(_idx + 1);
                            return productName;
                        }
                        if (_laneGroupKey === "typeLevel1" || _laneGroupKey === "typeLevel2" || _laneGroupKey === "typeLevel3") {
                            const _entry = _typeLevelMap[productName] || {};
                            const _v = _entry[_laneGroupKey];
                            return _v != null && _v !== "" ? String(_v) : "__none__" + productName;
                        }
                        return productName; // no grouping
                    };
                    // v3.3.50: hierarchical differentiation key
                    // v3.3.59: parent grouping now uses TL1 (Pinion/Ring) as differKey so
                    // lane 0 = pinion + lane 1 = ring of the SAME gearset on the same machine.
                    const _differKeyOf = (productName) => {
                        const _entry = _typeLevelMap[productName] || {};
                        if (_laneGroupKey === "typeLevel3") {
                            return _entry.typeLevel2 != null && _entry.typeLevel2 !== ""
                                ? String(_entry.typeLevel2) : productName;
                        }
                        if (_laneGroupKey === "typeLevel2") {
                            return _entry.typeLevel1 != null && _entry.typeLevel1 !== ""
                                ? String(_entry.typeLevel1) : productName;
                        }
                        if (_laneGroupKey === "parent") {
                            // v3.3.59: differentiate lanes by TL1 (Pinion / Ring / GearSet).
                            // This pairs lane 0 = pinion with lane 1 = ring of the same parent.
                            if (_entry.typeLevel1 != null && _entry.typeLevel1 !== "") {
                                return String(_entry.typeLevel1);
                            }
                            // Fallback: name-prefix (PIN-... -> "Pinion", RING-... -> "Ring")
                            const _name = String(productName);
                            const _hi = _name.indexOf('-');
                            if (_hi > 0) return _name.slice(0, _hi);
                            return productName;
                        }
                        // typeLevel1, "" → differ by product name
                        return productName;
                    };

                    for (let _lane = 0; _lane < _laneCount; _lane++) {
                        const _thisLaneProducts = new Set();
                        let remainingMinutes = availMinPerShift;
                        const _laneIdx = _lane; // closure-captured

                    while (remainingMinutes > 0) {
                        // v3.3.71: SPLIT SELECTION BY AREA ROLE.
                        //   LAST area  -> existing priority scoring (deliveries / goals).
                        //   MAINSTREAM -> pure pull, NO scoring. Continuity-first per machine,
                        //                then largest remaining downstream demand. Yields long
                        //                contiguous runs of one product per machine
                        //                (changeover-minimised) with quantity strictly tied to
                        //                what downstream actually pulls (cumDemand - buffer -
                        //                already-scheduled). Mainstream area never schedules
                        //                its own goals -- only what the bottleneck pulls through.
                        let bestProduct = null;
                        let bestScore = -Infinity;

                        if (!isLastArea && downstreamDemand) {
                            // ===== MAINSTREAM AREA: PURE PULL (urgency-aware, v3.3.80) =====
                            // The previous v3.3.71 selection picked the product with the
                            // largest cumulative remaining demand, which made upstream
                            // pre-build far-future demand instead of feeding downstream's
                            // immediate next-slot consumption. Now: URGENT (downstream
                            // needs it by this slot's offset target) wins over PRE-BUILD,
                            // with continuity preferences applied within bands.
                            const _urgentGapFor = (p) => {
                                // _getDownstreamCumDemandBySlot already subtracts initialBuffer.
                                const _downCum = _getDownstreamCumDemandBySlot(p.name, nonPastSlotIdx);
                                const _alreadyHere = scheduledPerProduct[p.name] || 0;
                                return Math.max(0, _downCum - _alreadyHere);
                            };
                            const _futureNeedFor = (p) => {
                                const _arr = downstreamDemand.cumDemand[p.name];
                                if (!_arr) return 0;
                                const _totalCum = _arr[_arr.length - 1] || 0;
                                const _buf = downstreamDemand.initialBuffer[p.name] || 0;
                                const _alreadyHere = scheduledPerProduct[p.name] || 0;
                                return Math.max(0, _totalCum - _buf - _alreadyHere);
                            };
                            const _isCandidate = (p) => {
                                if (!p) return false;
                                if (p._qualityBlocked) return false;
                                if (p._satisfiedThisSlot) return false;
                                if (!this._machineCanProduce(m, p.name)) return false;
                                if (!_mgPassesBind2(p.name)) return false; // v3.7+
                                if (_laneIdx > 0 && _completedLaneDifferKeys.has(_differKeyOf(p.name))) return false;
                                if (_laneGroupKey && _machineGroupKey !== null && _groupOf(p.name) !== _machineGroupKey) return false;
                                const _ct = this._getCT(m, p.name, m.cycleTime);
                                if (_ct <= 0 || Math.floor(remainingMinutes / _ct) <= 0) return false;
                                if (_futureNeedFor(p) <= 0) return false;
                                return true;
                            };

                            // Set of products already chosen this shift (any machine), for
                            // specialization preference.
                            const _runningThisShift = new Set();
                            for (const _sm of (shiftEntry.machines || [])) {
                                const _prods = _sm.products || (_sm.productName && _sm.productName !== "-" ? [_sm] : []);
                                for (const _pp of _prods) if (_pp.productName) _runningThisShift.add(_pp.productName);
                            }
                            for (const _mp of machineProducts) {
                                if (_mp.productName) _runningThisShift.add(_mp.productName);
                            }

                            // v3.3.82: STRICT pure pull. Pick a product ONLY if it has a
                            // positive URGENT gap (downstream cumDemand at this slot's
                            // offset target minus already-produced minus buffer > 0). NO
                            // pre-build, NO scoring, NO bonuses. If no urgent product
                            // exists, the slot stays EMPTY -- exactly matching the user's
                            // contract: "produce only what the next station needs, nothing
                            // else; if there is nothing to plan, leave empty".
                            //
                            // Selection (tie-breakers, not bonuses):
                            //   1) In-shift continuity: same product already on this machine
                            //      this shift, if it still has urgent demand.
                            //   2) Cross-shift continuity: same product as previous shift on
                            //      this machine, if still urgent.
                            //   3) An urgent product NOT yet running on another machine in
                            //      this shift (specialization → fewer changeovers across area).
                            //   4) Any urgent product (allow duplicate).
                            const _urgentRemain = (p) => {
                                // _getDownstreamCumDemandBySlot already subtracts buffer.
                                const _downCum = _getDownstreamCumDemandBySlot(p.name, nonPastSlotIdx);
                                const _alreadyHere = scheduledPerProduct[p.name] || 0;
                                return Math.max(0, _downCum - _alreadyHere);
                            };
                            const _isUrgent = (p) => {
                                if (!p) return false;
                                if (p._qualityBlocked) return false;
                                if (p._satisfiedThisSlot) return false;
                                if (!this._machineCanProduce(m, p.name)) return false;
                                if (!_mgPassesBind2(p.name)) return false; // v3.7+
                                if (_laneIdx > 0 && _completedLaneDifferKeys.has(_differKeyOf(p.name))) return false;
                                if (_laneGroupKey && _machineGroupKey !== null && _groupOf(p.name) !== _machineGroupKey) return false;
                                const _ct = this._getCT(m, p.name, m.cycleTime);
                                if (_ct <= 0 || Math.floor(remainingMinutes / _ct) <= 0) return false;
                                return _urgentRemain(p) > 0;
                            };

                            // 1) In-shift continuity (still urgent)
                            for (const _mp of machineProducts) {
                                const _p = productNeeds.find(pp => pp.name === _mp.productName);
                                if (_isUrgent(_p)) { bestProduct = _p; break; }
                            }
                            // 2) Cross-shift continuity (still urgent)
                            if (!bestProduct) {
                                const _lp = lastProductOnMachine[m.name];
                                if (_lp) {
                                    const _p = productNeeds.find(pp => pp.name === _lp);
                                    if (_isUrgent(_p)) bestProduct = _p;
                                }
                            }
                            // 3) Urgent + not duplicated this shift
                            if (!bestProduct) {
                                for (const p of productNeeds) {
                                    if (!_isUrgent(p)) continue;
                                    if (_runningThisShift.has(p.name)) continue;
                                    bestProduct = p;
                                    break;
                                }
                            }
                            // 4) Any urgent product (allow duplicate)
                            if (!bestProduct) {
                                for (const p of productNeeds) {
                                    if (!_isUrgent(p)) continue;
                                    bestProduct = p;
                                    break;
                                }
                            }
                            // If still null -> no urgent product -> slot stays empty (the
                            // outer `if (!bestProduct) break;` exits the while loop).
                        } else {
                            // ===== LAST AREA: priority scoring (deliveries / goals) =====
                        for (const p of productNeeds) {
                            if (p._qualityBlocked) continue;
                            if (p._satisfiedThisSlot) continue;  // v3.3.28: skip products already at downstream demand cap // Quality throughput reached
                            if (!this._machineCanProduce(m, p.name)) continue;
                            if (!_mgPassesBind2(p.name)) continue; // v3.7+ machineGroupKey bind
                            // v3.3.44/.50: parallel-lanes cross-lane exclusion — exclude products
                            // whose differentiation key is already used in a lower-numbered lane.
                            // For laneGroupKey=typeLevel2, this means lane 1 picks a different TL1
                            // (e.g., lane 0 = pinion → lane 1 = ring), keeping them in the same TL2 group.
                            if (_laneIdx > 0 && _completedLaneDifferKeys.has(_differKeyOf(p.name))) continue;
                            // v3.3.49: lane grouping — if a group is set and locked, exclude products outside the group
                            if (_laneGroupKey && _machineGroupKey !== null && _groupOf(p.name) !== _machineGroupKey) continue;
                            const totalRemaining = p.curDelivery + p.curGoal + p.nxtDelivery + p.nxtGoal;
                            if (totalRemaining <= 0) continue;

                            const ct = this._getCT(m, p.name, m.cycleTime);
                            if (ct <= 0 || Math.floor(remainingMinutes / ct) <= 0) continue;

                            let score = 0;

                            // v3.3.29: For non-last areas use PURE pull-MRP scoring.
                            // Priority = how much of this product the immediate-next area
                            // needs in its next consuming shift. Building inventory ahead is
                            // allowed but lower priority.  Skip the urgent-delivery / change-
                            // over heuristics entirely (those only matter at the last area
                            // where actual goals & deliveries live).
                            if (!isLastArea && downstreamDemand) {
                                const _downCum = _getDownstreamCumDemandBySlot(p.name, nonPastSlotIdx);
                                const _alreadyHere = scheduledPerProduct[p.name] || 0;
                                const _gap = Math.max(0, _downCum - _alreadyHere);
                                if (_gap > 0) {
                                    score = 1000000 + _gap;
                                } else {
                                    const _arr = downstreamDemand.cumDemand[p.name];
                                    const _totalCum = _arr ? (_arr[_arr.length - 1] || 0) : 0;
                                    const _buf = downstreamDemand.initialBuffer[p.name] || 0;
                                    let _futureNeed = Math.max(0, _totalCum - _buf - _alreadyHere);
                                    // v3.3.31 BOM fallback: when downstream produces a different
                                    // SKU (assembly that does not carry this component name),
                                    // use product own bucket totals which include BOM-virtual goals.
                                    // v3.3.61: gate the fallback on `!_arr` so it ONLY fires when
                                    // downstream genuinely doesn't track this product. Without
                                    // this gate, satisfied-cumulative cases also fall back to
                                    // product goals, causing upstream over-pull (e.g. Furnace
                                    // producing more than Shot Peen actually consumes).
                                    if (!_arr) {
                                        // v3.3.43: time-aware bucket selection. Only count buckets
                                        // that align with this slot's customer-facing deadline.
                                        // If the slot reaches the last area in next week
                                        // (targetWeek="next"), cur-week-only products can't be
                                        // fulfilled in time anyway — exclude their cur-week buckets
                                        // from the score so nxt-week-aligned products win the slot.
                                        let _aligned;
                                        if (targetWeek === "next") {
                                            _aligned = (p.nxtDelivery || 0) + (p.nxtGoal || 0);
                                            // v3.3.56: if next-week not yet planned, fall back
                                            // to current-week residual so capacity isn't wasted
                                            if (_aligned === 0) {
                                                _aligned = (p.curDelivery || 0) + (p.curGoal || 0);
                                            }
                                        } else {
                                            _aligned = (p.curDelivery || 0) + (p.curGoal || 0) +
                                                       (p.nxtDelivery || 0) + (p.nxtGoal || 0);
                                        }
                                        _futureNeed = Math.max(0, _aligned - _alreadyHere);
                                    }
                                    if (_futureNeed <= 0) continue;
                                    // v3.3.56: PRE-BUILD band. Was 100..1099 — lanes went empty
                                    // when no urgent gap existed. Now 500000..999999 so capacity
                                    // is filled in pull order, while staying strictly below the
                                    // 1000000+ urgent gap band so JIT pull still wins ties.
                                    score = 500000 + Math.min(_futureNeed, 499999);
                                }
                                // v3.3.57: SAME-FAMILY CONTINUITY — prefer products from the
                                // same BOM parent as what this machine produced most recently.
                                // Reduces machine-to-machine handoffs of the same gearset
                                // (e.g. GS13 stays on SP-2 instead of jumping to SP-1).
                                // +50k tilts ties WITHIN a band; doesn't cross bands.
                                const _lastOnM = lastProductOnMachine[m.name];
                                if (_lastOnM && _laneGroupKey === "parent") {
                                    if (_groupOf(_lastOnM) === _groupOf(p.name)) {
                                        score += 50000;
                                    }
                                }
                                // v3.3.60: SAME-GEARSET-FAMILY ON SAME MACHINE — when this is
                                // lane > 0 (or this lane already produced something), prefer
                                // products whose BOM-family matches what this machine has
                                // already chosen. Works regardless of laneGroupKey, so even
                                // typeLevel2 grouping pairs PIN-GS14 with RING-GS14 (not
                                // RING-GS11). Family derived from BOM, fallback to name suffix.
                                const _familyOf60 = (pn) => {
                                    for (const _prnt in _bomMapRef) {
                                        if (_bomMapRef[_prnt] && _bomMapRef[_prnt][pn] !== undefined) return _prnt;
                                    }
                                    const _idx = String(pn).lastIndexOf('-');
                                    return _idx >= 0 ? String(pn).slice(_idx + 1) : pn;
                                };
                                if (machineProducts.length > 0) {
                                    const _myFam = _familyOf60(p.name);
                                    let _machineHasFam = false;
                                    for (const _mp of machineProducts) {
                                        if (_familyOf60(_mp.productName) === _myFam) { _machineHasFam = true; break; }
                                    }
                                    if (_machineHasFam) {
                                        score += 75000;
                                    }
                                }
                                if (score > bestScore) {
                                    bestScore = score;
                                    bestProduct = p;
                                }
                                continue;
                            }

                            // --- DELIVERY URGENCY (HIGHEST PRIORITY) — only for the LAST area ---
                            // Delivery date adjusted by pipeline offset
                            const dd = p.curDeliveryDate || p.nxtDeliveryDate || "9999-12-31";
                            // v3.3.26: deadline shift uses CUMULATIVE offset to last area
                            const offsetDays = Math.ceil(_offsetFromLast / shiftCount);
                            const ddDate = new Date(dd);
                            ddDate.setDate(ddDate.getDate() - offsetDays);
                            const effectiveDD = this._toLocalDateStr(ddDate);
                            const isUrgentDelivery = p.curDelivery > 0 && effectiveDD <= day.dateStr;

                            // curDelivery items always get top priority — overrides changeover
                            if (p.curDelivery > 0) {
                                score += 200000;
                                // v3.3.55: graduated priority by delivery-date proximity.
                                // Among products with current-week deliveries, the one with
                                // the EARLIEST delivery date wins. +30k for today, -5k per day,
                                // floor 0. This breaks the tie that previously caused GS11
                                // to be scheduled even when GS12/GS14 had earlier dates.
                                const _ddObj55 = new Date(p.curDeliveryDate || day.dateStr);
                                const _todayObj55 = new Date(day.dateStr);
                                const _daysOut55 = Math.max(0, Math.round((_ddObj55 - _todayObj55) / 86400000));
                                score += Math.max(0, 30000 - _daysOut55 * 5000);
                            }
                            if (isUrgentDelivery) score += 500000; // past effective deadline

                            // --- CHANGEOVER AVOIDANCE (only when no urgent delivery conflict) ---
                            const onMachineNow = machineProducts.some(mp => mp.productName === p.name);
                            const wasLastShift = machineProducts.length === 0 && lastProductOnMachine[m.name] === p.name;
                            // Check if there are ANY urgent delivery items for other products on other machines
                            const hasUrgentDeliveryElsewhere = productNeeds.some(other =>
                                other.name !== p.name && other.curDelivery > 0);
                            // Slot-aware "this-week-first" semantics: when targetWeek is
                            // "next" we measure next-week needs instead so the heuristics still pull
                            // the matching priority forward.
                            const _b0 = _priorityForSlot[0], _b1 = _priorityForSlot[1];
                            const hasCurWeekNeedsElsewhere = productNeeds.some(other =>
                                other.name !== p.name && (other[_b0] > 0 || other[_b1] > 0));
                            const onlyNextWeekNeeds = p[_b0] === 0 && p[_b1] === 0;
                            // Only apply changeover bonus if this product also has delivery need,
                            // OR if there are no urgent deliveries waiting
                            // v3.3.26: encourage mixing on bottleneck areas. When THIS area
                            // has fewer machines than the downstream area, the changeover bonus is
                            // strongly attenuated so the scheduler rotates products freely to keep
                            // multiple downstream machines fed.
                            const _coScale = (function () {
                                if (isLastArea) return 1.0;
                                const _dArea = chain[chainIdx + 1] && chain[chainIdx + 1].area;
                                const _dM = (_dArea && _dArea.machines && _dArea.machines.length) || 0;
                                const _tM = (machines && machines.length) || 0;
                                return (_tM > 0 && _dM > _tM) ? 0.15 : 1.0;
                            })();
                            if (onMachineNow || wasLastShift) {
                                if (p.curDelivery > 0 || !hasUrgentDeliveryElsewhere) {
                                    if (onlyNextWeekNeeds && hasCurWeekNeedsElsewhere) {
                                        score += (onMachineNow ? 1500 : 800) * _coScale;
                                    } else {
                                        score += (onMachineNow ? 100000 : 50000) * _coScale;
                                    }
                                } else {
                                    score += (onMachineNow ? 5000 : 2000) * _coScale;
                                }
                            }

                            // Penalty if this product is already being produced by another machine this shift
                            const alreadyCoveredThisShift = shiftEntry.machines.some(sm =>
                                sm.products && sm.products.some(mp => mp.productName === p.name));
                            if (alreadyCoveredThisShift && onlyNextWeekNeeds) {
                                // Strong penalty: next-week-only product already covered elsewhere this shift
                                score -= 3500;
                            } else if (alreadyCoveredThisShift && p.curDelivery === 0) {
                                // Mild penalty: current-week goal product already covered elsewhere
                                score -= 1000;
                            }

                            // --- BUCKET PRIORITY (offset-aware) ---
                            if (p[_priorityForSlot[0]] > 0) score += 4000;
                            else if (p[_priorityForSlot[1]] > 0) score += 3000;
                            else if (p[_priorityForSlot[2]] > 0) score += 2000;
                            else if (p[_priorityForSlot[3]] > 0) score += 1000;

                            // --- THIS-WEEK-FIRST RULE ---
                            // When current-week products still have unmet goals,
                            // strongly penalize next-week-only products so this-week goals are always met first.
                            // The penalty must exceed any delivery proximity bonus (+3000) to be effective.
                            if (onlyNextWeekNeeds && hasCurWeekNeedsElsewhere) {
                                score -= 6000;
                            }

                            // Downstream demand: soft scoring
                            if (!isLastArea && downstreamDemand) {
                                const needed = _getDownstreamCumDemandBySlot(p.name, nonPastSlotIdx);
                                const already = scheduledPerProduct[p.name] || 0;
                                if (needed > 0 && already < needed) {
                                    // Reduce downstream pull for next-week-only products
                                    // when this-week goals still need scheduling
                                    if (onlyNextWeekNeeds && hasCurWeekNeedsElsewhere) {
                                        score += 2000 + ((needed - already) / needed) * 500;
                                    } else {
                                        score += 8000 + ((needed - already) / needed) * 2000;
                                    }
                                } else if (already >= needed) {
                                    score += 500;
                                }
                            }

                            // v3.3.55: graduated proximity bonus by days-until-delivery.
                            // Was: binary +3000 for any delivery within 2 days. Now: +3000 for
                            // same-day, -1000 per extra day (so May-5 delivery on Mon May-4 still
                            // outscores May-6 / May-7 deliveries even within the 2-day window).
                            if (!isUrgentDelivery) {
                                const _ddObjP = new Date(effectiveDD);
                                const _todayObjP = new Date(day.dateStr);
                                const _daysOutP = Math.max(0, Math.round((_ddObjP - _todayObjP) / 86400000));
                                if (_daysOutP <= 4) {
                                    const _proxBase = Math.max(0, 3000 - _daysOutP * 750);
                                    if (onlyNextWeekNeeds && hasCurWeekNeedsElsewhere) {
                                        score += Math.min(_proxBase, 500);
                                    } else {
                                        score += _proxBase;
                                    }
                                }
                            }

                            // Larger batches preferred (slight tiebreaker)
                            score += Math.min(totalRemaining, 999) / 1000;

                            if (score > bestScore) {
                                bestScore = score;
                                bestProduct = p;
                            }
                        }
                        } // v3.3.71: end of LAST-AREA scoring (else branch of mainstream pull)

                        if (!bestProduct) break;

                        const ct = this._getCT(m, bestProduct.name, m.cycleTime);
                        const maxFromTime = Math.floor(remainingMinutes / ct);
                        if (maxFromTime <= 0) break;

                        // Drain this product across all buckets in priority order
                        let totalQty = 0;
                        let qtyLimit = maxFromTime;

                        // Apply quality throughput constraint: cap qty per shift per product
                        let qualitySkip = false;
                        if (qualityMaxPerShift[bestProduct.name] !== undefined) {
                            const alreadyScheduledThisShift = (shiftEntry.machines || []).reduce((sum, me) => {
                                const prods = me.products || [me];
                                return sum + prods.filter(p => p.productName === bestProduct.name).reduce((s, p) => s + p.qty, 0);
                            }, 0) + machineProducts.filter(mp => mp.productName === bestProduct.name).reduce((s, mp) => s + mp.qty, 0);
                            const qtyAvailFromQuality = Math.max(0, qualityMaxPerShift[bestProduct.name] - alreadyScheduledThisShift);
                            qtyLimit = Math.min(qtyLimit, qtyAvailFromQuality);
                            if (qtyLimit <= 0) {
                                bestProduct._qualityBlocked = true;
                                qualitySkip = true;
                            }
                        }
                        if (qualitySkip) continue; // Re-enter while loop, blocked product excluded by scoring

                        // v3.3.28: TRUE pull-MRP rate-limit. Cap how much of `bestProduct` we
                        // produce in this slot so we cannot overrun the cumulative demand
                        // downstream needs by THIS slot's offset position. Without this cap,
                        // a high-priority urgent-delivery product would consume the whole
                        // shift even when only a fraction is needed by the next downstream
                        // shift, starving other products that are also due.
                        if (!isLastArea && downstreamDemand) {
                            // v3.3.31 drain cap with BOM fallback.
                            const _arr = downstreamDemand.cumDemand[bestProduct.name];
                            const _totalCum = _arr ? (_arr[_arr.length - 1] || 0) : 0;
                            const _buf = downstreamDemand.initialBuffer[bestProduct.name] || 0;
                            const _alreadyHere = scheduledPerProduct[bestProduct.name] || 0;
                            let _remainingTotal = Math.max(0, _totalCum - _buf - _alreadyHere);
                            if (_remainingTotal === 0) {
                                const _bucketTotal = (bestProduct.curDelivery || 0) + (bestProduct.curGoal || 0) +
                                                     (bestProduct.nxtDelivery || 0) + (bestProduct.nxtGoal || 0);
                                _remainingTotal = Math.max(0, _bucketTotal - _alreadyHere);
                            }
                            if (_remainingTotal <= 0) {
                                bestProduct._satisfiedThisSlot = true;
                                continue;
                            }
                            qtyLimit = Math.min(qtyLimit, _remainingTotal);
                        }

                        // v3.7.45: MIN-FRAGMENT GUARD (Option A). Don't top off a shift with a
                        // tiny sliver of a SECONDARY product. If this machine already carries a
                        // product this slot and the next product would use less than ~10% of the
                        // shift's productive time, stop filling — leave the small remainder idle.
                        // The product's demand stays in its buckets (we check BEFORE draining), so
                        // nothing is lost; it is scheduled contiguously in a later slot. The FIRST
                        // product on the machine is never guarded, so small total demands still get
                        // placed (as the primary of their own shift, not as a shift-breaking sliver).
                        if (machineProducts.length >= 1) {
                            let _availFrag = 0;
                            for (const _b of _priorityForSlot) { if ((bestProduct[_b] || 0) > 0) _availFrag += bestProduct[_b]; }
                            const _wouldBe = Math.min(qtyLimit, _availFrag);
                            if (_wouldBe > 0 && _wouldBe * ct < availMinPerShift * 0.10) break;
                        }

                        // v3.3.41: time-aware bucket name promotion. The productNeeds
                        // buckets are inherited from downstream by ratio (v3.3.31), so an
                        // upstream area far from the last area may drain from a curWeek
                        // bucket even when the slot's output reaches the final area in the
                        // next calendar week (cumulative shiftOffset crosses week boundary).
                        // The QUANTITY allocation is unchanged (priority already prefers nxt
                        // when target=next), but the STORED bucket name reflects the slot's
                        // customer-facing meaning so render code (bucketsToShow → labels)
                        // displays "Jövő heti..." instead of "E heti...".
                        const _promote = (b) => {
                            if (targetWeek !== "next") return b;
                            if (b === "curGoal") return "nxtGoal";
                            if (b === "curDelivery") {
                                // v3.3.42: only promote to nxtDelivery if there is an actual
                                // next-week delivery scheduled for this product. If not, the
                                // slot's output supports next-week GOAL (not a delivery that
                                // doesn't exist on the calendar).
                                const _hasNxtDel = ((bestProduct.nxtDeliveryOrig || 0) > 0)
                                                  || ((bestProduct.nxtDelivery || 0) > 0);
                                return _hasNxtDel ? "nxtDelivery" : "nxtGoal";
                            }
                            return b;
                        };

                        const bucketsDrained = [];
                        for (const bucket of _priorityForSlot) {
                            if (bestProduct[bucket] <= 0 || totalQty >= qtyLimit) continue;
                            const qty = Math.min(qtyLimit - totalQty, bestProduct[bucket]);
                            if (qty > 0) {
                                bestProduct[bucket] -= qty;
                                totalQty += qty;
                                const _displayBucket = _promote(bucket);
                                if (!bucketsDrained.includes(_displayBucket)) bucketsDrained.push(_displayBucket);
                            }
                        }

                        if (totalQty <= 0) break;

                        scheduledPerProduct[bestProduct.name] = (scheduledPerProduct[bestProduct.name] || 0) + totalQty;
                        remainingMinutes -= totalQty * ct;
                        // v3.3.44/.50: track product's differKey in this lane for cross-lane exclusion
                        _thisLaneProducts.add(bestProduct.name);
                        _thisLaneProducts._k = _thisLaneProducts._k || new Set();
                        _thisLaneProducts._k.add(_differKeyOf(bestProduct.name));
                        // v3.3.49: lock the machine's group on the first successful pick
                        if (_laneGroupKey && _machineGroupKey === null) {
                            _machineGroupKey = _groupOf(bestProduct.name);
                        }

                        // Merge with existing entry for same product on this machine
                        const existingEntry = machineProducts.find(mp => mp.productName === bestProduct.name);
                        if (existingEntry) {
                            existingEntry.qty += totalQty;
                            for (const bk of bucketsDrained) {
                                if (!existingEntry.buckets.includes(bk)) existingEntry.buckets.push(bk);
                            }
                            // v3.3.41: also promote primary bucket on merges
                            existingEntry.bucket = _promote(existingEntry.bucket);
                            existingEntry.bucketLabel = bucketLabels[existingEntry.bucket];
                        } else {
                            machineProducts.push({
                                productName: bestProduct.name,
                                qty: totalQty,
                                colorIdx: this._stableColorIdx(bestProduct.name),
                                bucket: bucketsDrained[0],
                                bucketLabel: bucketLabels[bucketsDrained[0]],
                                buckets: bucketsDrained
                            });
                        }
                    }

                        // v3.3.44/.50: end of this lane — accumulate its differKeys for next lane
                        if (_thisLaneProducts._k) {
                            for (const _k of _thisLaneProducts._k) _completedLaneDifferKeys.add(_k);
                        } else {
                            for (const _pn of _thisLaneProducts) _completedLaneDifferKeys.add(_differKeyOf(_pn));
                        }
                    }

                    if (machineProducts.length > 0) {
                        const primary = machineProducts[0];
                        // Track last product on machine for changeover minimization
                        const lastProd = machineProducts[machineProducts.length - 1];
                        lastProductOnMachine[m.name] = lastProd.productName;
                        shiftEntry.machines.push({
                            machineName: m.name,
                            productName: primary.productName,
                            qty: primary.qty,
                            colorIdx: primary.colorIdx,
                            bucket: primary.bucket,
                            bucketLabel: primary.bucketLabel,
                            products: machineProducts
                        });
                    } else {
                        shiftEntry.machines.push({
                            machineName: m.name, productName: "-", qty: 0, colorIdx: -1,
                            bucket: null, bucketLabel: null, products: []
                        });
                    }
                }
                dailyPlan.push(shiftEntry);
            }
        }

        // ====== POST-PROCESS: CHANGEOVER OPTIMIZATION ======
        // After scheduling is complete, try swapping product assignments between
        // machines within the same shift to minimize changeovers.
        // This does NOT change WHAT is produced, only WHICH machine produces it.
        {
            // Build a map of machine index → previous shift's last product
            const prevProduct = {};
            for (const entry of dailyPlan) {
                if (entry.isPast) {
                    // Skip past days but still track products
                    for (const me of entry.machines) {
                        if (me.productName && me.productName !== "-" && me.productName !== "—") {
                            const lastP = me.products && me.products.length > 0
                                ? me.products[me.products.length - 1].productName
                                : me.productName;
                            prevProduct[me.machineName] = lastP;
                        }
                    }
                    continue;
                }
                // For each shift entry, try pairwise swaps between machines
                const machEntries = entry.machines;
                const n = machEntries.length;
                for (let i = 0; i < n; i++) {
                    for (let j = i + 1; j < n; j++) {
                        const mA = machEntries[i];
                        const mB = machEntries[j];
                        // Skip if either is down/empty
                        if (!mA.productName || mA.productName === "-" || mA.productName === "—") continue;
                        if (!mB.productName || mB.productName === "-" || mB.productName === "—") continue;
                        // Skip if same product (nothing to swap)
                        if (mA.productName === mB.productName) continue;
                        // Check both machines can produce each other's products
                        const machObjA = machines.find(m => m.name === mA.machineName);
                        const machObjB = machines.find(m => m.name === mB.machineName);
                        if (!machObjA || !machObjB) continue;
                        // Collect all product names from both machines
                        const prodsA = (mA.products || []).map(p => p.productName);
                        const prodsB = (mB.products || []).map(p => p.productName);
                        const allProdsA = [...new Set(prodsA)];
                        const allProdsB = [...new Set(prodsB)];
                        // Check feasibility: can A produce all of B's products and vice versa?
                        const canSwap = allProdsB.every(pn => this._machineCanProduce(machObjA, pn))
                                     && allProdsA.every(pn => this._machineCanProduce(machObjB, pn));
                        if (!canSwap) continue;
                        // Check cycle times are compatible (within 5% tolerance)
                        let ctCompatible = true;
                        for (const pn of [...allProdsA, ...allProdsB]) {
                            const ctA = this._getCT(mA.machineName, pn, 0);
                            const ctB = this._getCT(mB.machineName, pn, 0);
                            if (ctA > 0 && ctB > 0 && Math.abs(ctA - ctB) / Math.max(ctA, ctB) > 0.05) {
                                ctCompatible = false; break;
                            }
                        }
                        if (!ctCompatible) continue;
                        // Count changeovers: current vs swapped
                        const prevA = prevProduct[mA.machineName] || null;
                        const prevB = prevProduct[mB.machineName] || null;
                        const firstA = prodsA[0] || mA.productName;
                        const firstB = prodsB[0] || mB.productName;
                        const currentChangeovers =
                            (prevA && prevA !== firstA ? 1 : 0) +
                            (prevB && prevB !== firstB ? 1 : 0);
                        const swappedChangeovers =
                            (prevA && prevA !== firstB ? 1 : 0) +
                            (prevB && prevB !== firstA ? 1 : 0);
                        if (swappedChangeovers < currentChangeovers) {
                            // Swap the entire machine entries (products, quantities, etc.)
                            const tmpProducts = mA.products;
                            const tmpProductName = mA.productName;
                            const tmpQty = mA.qty;
                            const tmpColorIdx = mA.colorIdx;
                            const tmpBucket = mA.bucket;
                            const tmpBucketLabel = mA.bucketLabel;
                            mA.products = mB.products;
                            mA.productName = mB.productName;
                            mA.qty = mB.qty;
                            mA.colorIdx = mB.colorIdx;
                            mA.bucket = mB.bucket;
                            mA.bucketLabel = mB.bucketLabel;
                            mB.products = tmpProducts;
                            mB.productName = tmpProductName;
                            mB.qty = tmpQty;
                            mB.colorIdx = tmpColorIdx;
                            mB.bucket = tmpBucket;
                            mB.bucketLabel = tmpBucketLabel;
                        }
                    }
                }
                // Update prevProduct for next shift
                for (const me of machEntries) {
                    if (me.productName && me.productName !== "-" && me.productName !== "—") {
                        const lastP = me.products && me.products.length > 0
                            ? me.products[me.products.length - 1].productName
                            : me.productName;
                        prevProduct[me.machineName] = lastP;
                    }
                }
            }
        }

        // ====== POST-PROCESS STEP 2: MULTI-PRODUCT FRAGMENT REDISTRIBUTION ======
        // v3.7.16: extracted to _consolidateMultiProductFragments() so the
        // mainstream pull-scheduler path (_calculateMainstreamAreaPlan) can
        // share it. v3.7.17: now passes machines + availMinPerShift so the
        // capacity check fires on the target machine.
        this._consolidateMultiProductFragments(dailyPlan, area, machines, availMinPerShift);

        // v3.7.15: post-process — move small single-product leftovers onto a
        // sister machine already running the same product. Runs AFTER the
        // STEP 2 multi-product fragment redistribution above, so any small
        // singles that the previous pass produced (or that survived initial
        // scheduling) get a second chance to consolidate. Honours machine
        // capability + cycle time + remaining shift capacity.
        this._consolidateSinglesIntoExistingMachine(dailyPlan, area, machines, availMinPerShift);

        const result = {
            chainPosition: chainIdx,
            totalAreas: totalProdAreas,
            pipelineOffset: configuredOffset,
            availMinPerShift: availMinPerShift,
            shiftCount: shiftCount,
            productNeeds: productNeeds.map(p => ({
                name: p.name,
                curDeliveryOrig: p.curDeliveryOrig,
                curGoalOrig: p.curGoalOrig,
                nxtDeliveryOrig: p.nxtDeliveryOrig,
                nxtGoalOrig: p.nxtGoalOrig,
                colorIdx: this._stableColorIdx(p.name)
            })),
            dailyPlan: dailyPlan,
            productNames: allProductNames,
            planColors: planColors,
            curWeekNum: curWeekNum,
            nxtWeekNum: nxtWeekNum
        };
        // Cache the plan for upstream-aware scheduling
        if (!this._planCache) this._planCache = {};
        this._planCache[area.id] = result;
        return result;
    }

    // --- SUPPLY WARNING: check if upstream can feed this area ---
    _applySupplyWarnings(area, plan) {
        if (!plan || !this._planCache) return;
        const chain = this._getProductionChain();
        const chainIdx = chain.findIndex(c => c.area.id === area.id);
        // v3.3.16: skip supply warnings for orphan areas (no upstream in main chain)
        if (chainIdx <= 0) return;

        const upstreamEntry = chain[chainIdx - 1];
        const upstreamArea = upstreamEntry.area;
        // Upstream plan may not be cached yet (last area plans first, upstream later)
        // Trigger calculation if needed
        const upstreamPlan = this._planCache?.[upstreamArea.id] || this._calculateAreaPlan(upstreamArea);
        if (!upstreamPlan) return;

        // Buffer between upstream and this area
        const bufBefore = upstreamEntry.bufferAfter;
        const pufIdx = bufBefore?.selectedPufferIdx || 0;
        const pufData = this.dataPuffers?.[pufIdx];
        const bufferStock = {};
        if (pufData && pufData.data) {
            for (const pName of Object.keys(pufData.data)) {
                bufferStock[pName] = pufData.data[pName] || 0;
            }
        }

        // v3.3.26: upstream's stored shiftOffset IS its relative offset to its next
        // area (= this area). So no subtraction needed.
        const upstreamOffset = upstreamArea.shiftSettings?.shiftOffset || 0;
        const relativeOffset = Math.max(0, upstreamOffset);

        // --- TOTAL supply from upstream plan (non-past) ---
        const upTotalSupply = {};
        for (const slot of upstreamPlan.dailyPlan) {
            if (slot.isPast) continue;
            for (const mach of slot.machines) {
                if (mach.isDown) continue;
                const prods = mach.products || [mach];
                for (const p of prods) {
                    if (!p.productName || p.productName === "-" || p.qty <= 0) continue;
                    upTotalSupply[p.productName] = (upTotalSupply[p.productName] || 0) + p.qty;
                }
            }
        }

        // --- TOTAL demand from this area's plan (non-past) ---
        const thisTotalDemand = {};
        for (const slot of plan.dailyPlan) {
            if (slot.isPast) continue;
            for (const mach of slot.machines) {
                if (mach.isDown) continue;
                const prods = mach.products || [mach];
                for (const p of prods) {
                    if (!p.productName || p.productName === "-" || p.qty <= 0) continue;
                    thisTotalDemand[p.productName] = (thisTotalDemand[p.productName] || 0) + p.qty;
                }
            }
        }

        // --- Build per-product analysis ---
        const allProducts = [...new Set([...Object.keys(thisTotalDemand), ...Object.keys(upTotalSupply)])];
        const analysis = [];
        const warningProducts = new Set();
        for (const prod of allProducts) {
            const demand = thisTotalDemand[prod] || 0;
            const supply = upTotalSupply[prod] || 0;
            const buf = bufferStock[prod] || 0;
            const available = supply + buf;
            const gap = Math.max(0, demand - available);
            const pct = demand > 0 ? Math.round((available / demand) * 100) : 100;
            const status = gap > 0 ? "warning" : "ok";
            if (gap > 0) warningProducts.add(prod);
            if (demand > 0) {
                analysis.push({ product: prod, demand, supply, buffer: buf, available, gap, pct, status });
            }
        }
        analysis.sort((a, b) => b.gap - a.gap);

        // Store on plan for summary panel
        plan.supplyAnalysis = analysis;
        plan.upstreamAreaName = upstreamArea.name || upstreamArea.customName || "Upstream";
        plan.hasSupplyWarnings = warningProducts.size > 0;

        // --- Cumulative per-slot warnings for tile markers ---
        const upNonPast = upstreamPlan.dailyPlan.filter(s => !s.isPast);
        const upCumSupply = {};
        for (let si = 0; si < upNonPast.length; si++) {
            for (const mach of upNonPast[si].machines) {
                if (mach.isDown) continue;
                for (const p of (mach.products || [mach])) {
                    if (!p.productName || p.productName === "-" || p.qty <= 0) continue;
                    if (!upCumSupply[p.productName]) upCumSupply[p.productName] = new Array(upNonPast.length).fill(0);
                    upCumSupply[p.productName][si] += p.qty;
                }
            }
        }
        for (const prod of Object.keys(upCumSupply)) {
            for (let i = 1; i < upCumSupply[prod].length; i++) upCumSupply[prod][i] += upCumSupply[prod][i - 1];
        }

        const thisNonPast = plan.dailyPlan.filter(s => !s.isPast);
        const thisCumDemand = {};
        for (let si = 0; si < thisNonPast.length; si++) {
            for (const mach of thisNonPast[si].machines) {
                if (mach.isDown) continue;
                for (const p of (mach.products || [mach])) {
                    if (!p.productName || p.productName === "-" || p.qty <= 0) continue;
                    if (!thisCumDemand[p.productName]) thisCumDemand[p.productName] = new Array(thisNonPast.length).fill(0);
                    thisCumDemand[p.productName][si] += p.qty;
                }
            }
        }
        for (const prod of Object.keys(thisCumDemand)) {
            for (let i = 1; i < thisCumDemand[prod].length; i++) thisCumDemand[prod][i] += thisCumDemand[prod][i - 1];
        }

        let npIdx = -1;
        for (const slot of plan.dailyPlan) {
            if (slot.isPast) continue;
            npIdx++;
            const slotGaps = {};
            for (const prod of Object.keys(thisCumDemand)) {
                const demand = thisCumDemand[prod][npIdx] || 0;
                if (demand <= 0) continue;
                const buf = bufferStock[prod] || 0;
                const upSlot = Math.min(npIdx + relativeOffset, (upCumSupply[prod]?.length || 1) - 1);
                const supply = (upCumSupply[prod] && upSlot >= 0) ? upCumSupply[prod][upSlot] : 0;
                const gap = demand - supply - buf;
                if (gap > 0) slotGaps[prod] = gap;
            }
            for (const mach of slot.machines) {
                if (mach.isDown) continue;
                let machGap = 0, hasW = false;
                for (const p of (mach.products || [mach])) {
                    if (slotGaps[p.productName] > 0) {
                        hasW = true; machGap += slotGaps[p.productName];
                        p.supplyWarning = true; p.supplyGap = slotGaps[p.productName];
                    }
                }
                if (hasW) { mach.supplyWarning = true; mach.supplyGap = machGap; }
            }
        }
    }

    // --- Default shift settings for new areas ---
    getDefaultShiftSettings() {
        return {
            selectedShiftIdx: 0,
            customShiftMinutes: 480,
            plannedStopMinutes: PLANNED_STOPS.map(s => s.defaultMinutes),
            shiftCount: 1,
            shiftOffset: 0
        };
    }

    // --- Persistence ---
    restoreFromDataView(dv) {
        try {
            const obj = dv.metadata?.objects?.areaStorage;
            if (!obj) return;
            if (typeof obj.theme === "string" && (obj.theme === "light" || obj.theme === "dark"))
                this.theme = obj.theme;
            if (typeof obj.language === "string" && (obj.language === "en" || obj.language === "hu"))
                this.language = obj.language;
            if (typeof obj.areaData === "string" && obj.areaData.length > 2) {
                try {
                    const parsed = JSON.parse(obj.areaData);
                    if (Array.isArray(parsed)) {
                        // Ensure each area has shift settings
                        this.areas = parsed.map(a => {
                            // Migrate single afterAreaId/beforeAreaId to arrays
                            if (a.afterAreaId && !a.afterAreaIds) {
                                a.afterAreaIds = [a.afterAreaId];
                                delete a.afterAreaId;
                            }
                            if (a.beforeAreaId && !a.beforeAreaIds) {
                                a.beforeAreaIds = [a.beforeAreaId];
                                delete a.beforeAreaId;
                            }
                            if (!a.afterAreaIds) a.afterAreaIds = [];
                            if (!a.beforeAreaIds) a.beforeAreaIds = [];
                            if (!a.shiftSettings) {
                                a.shiftSettings = this.getDefaultShiftSettings();
                            }
                            // Ensure plannedStopMinutes array length matches
                            if (!a.shiftSettings.plannedStopMinutes || a.shiftSettings.plannedStopMinutes.length !== PLANNED_STOPS.length) {
                                a.shiftSettings.plannedStopMinutes = PLANNED_STOPS.map(s => s.defaultMinutes);
                            }
                            if (typeof a.shiftSettings.shiftCount !== "number") {
                                a.shiftSettings.shiftCount = 1;
                            }
                            if (typeof a.shiftSettings.shiftOffset !== "number") {
                                a.shiftSettings.shiftOffset = 0;
                            }
                            // Auto-correct shiftCount from template if still default
                            const tmplSC = SHIFT_TEMPLATES[a.shiftSettings.selectedShiftIdx];
                            if (tmplSC && tmplSC.shifts > 0 && a.shiftSettings.shiftCount === 1) {
                                a.shiftSettings.shiftCount = tmplSC.shifts;
                            }
                            return a;
                        });
                    }
                } catch (e) {}
            }
            if (typeof obj.selectedAreaId === "string")
                this.selectedAreaId = obj.selectedAreaId || "__logistics__";
            if (typeof obj.shiftSectionCollapsed === "string")
                this.shiftSectionCollapsed = obj.shiftSectionCollapsed === "true";
            // Hybrid v3.3.9+: productGoals IS persisted again as `productGoalsUser` — acts as fallback when data roles are not bound.
            if (typeof obj.productGoals === "string" && obj.productGoals.length > 2) {
                try {
                    const parsed = JSON.parse(obj.productGoals);
                    if (parsed && typeof parsed === "object") this.productGoalsUser = parsed;
                } catch (e) { this.productGoalsUser = {}; }
            }
            if (typeof obj.currentWeekNum === "string" && obj.currentWeekNum !== "0") {
                this.currentWeekNum = +obj.currentWeekNum || 0;
            }
            if (typeof obj.nextWeekNum === "string" && obj.nextWeekNum !== "0") {
                this.nextWeekNum = +obj.nextWeekNum || 0;
            }
        } catch (e) {}
    }

    saveState() {
        try {
            this._planCache = {}; // Clear plan cache on state change
            this.isPersisting = true;
            const changes = [];
            changes.push({ objectName: "areaStorage", selector: null, properties: { theme: this.theme } });
            changes.push({ objectName: "areaStorage", selector: null, properties: { language: this.language } });
            changes.push({ objectName: "areaStorage", selector: null, properties: { areaData: JSON.stringify(this.areas) } });
            changes.push({ objectName: "areaStorage", selector: null, properties: { selectedAreaId: this.selectedAreaId || "__logistics__" } });
            // Hybrid v3.3.9+: productGoalsUser (user-entered goals/deliveries) is persisted so it survives session reloads.
            changes.push({ objectName: "areaStorage", selector: null, properties: { productGoals: JSON.stringify(this.productGoalsUser || {}) } });
            changes.push({ objectName: "areaStorage", selector: null, properties: { currentWeekNum: String(this.currentWeekNum) } });
            changes.push({ objectName: "areaStorage", selector: null, properties: { nextWeekNum: String(this.nextWeekNum) } });
            changes.push({ objectName: "areaStorage", selector: null, properties: { shiftSectionCollapsed: String(this.shiftSectionCollapsed) } });
            this.host.persistProperties({ merge: changes });
            setTimeout(() => { this.isPersisting = false; }, 300);
        } catch (e) { this.isPersisting = false; }
    }

    // --- Helpers ---
    t(key) { return TRANSLATIONS[this.language]?.[key] || key; }

    typeColor(type, th) {
        return type === "production" ? th.accent : type === "quality" ? th.purple : th.amber;
    }
    typeBgColor(type, th) {
        return type === "production" ? th.accentSoft : type === "quality" ? th.purpleSoft : th.amberSoft;
    }
    shiftLabel(tmpl) {
        if (this.language === "hu") return tmpl.label_hu;
        return tmpl.label_en;
    }
    stopLabel(stop) {
        if (this.language === "hu") return stop.label_hu;
        return stop.label_en;
    }

    getShiftMinutes(area) {
        const ss = area.shiftSettings;
        if (ss.selectedShiftIdx === SHIFT_TEMPLATES.length - 1) return ss.customShiftMinutes;
        return SHIFT_TEMPLATES[ss.selectedShiftIdx]?.minutes || 480;
    }
    getTotalPlannedStop(area) {
        return area.shiftSettings.plannedStopMinutes.reduce((s, v) => s + v, 0);
    }

    el(tag, css) {
        const e = document.createElement(tag);
        e.style.cssText = css;
        return e;
    }

    // Safely parse a static (developer-authored) SVG string and append it to a host element.
    // Uses DOMParser with image/svg+xml — no HTML injection risk because only a parsed SVG node is imported.
    setSVG(host, svgString) {
        while (host.firstChild) host.removeChild(host.firstChild);
        if (!svgString) return host;
        const parsed = new DOMParser().parseFromString(svgString, "image/svg+xml");
        const root = parsed.documentElement;
        if (root && root.nodeName.toLowerCase() === "svg") {
            host.appendChild(document.importNode(root, true));
        }
        return host;
    }

    // Remove all child nodes of a host element using the DOM API (no HTML assignment).
    clearNode(host) {
        while (host && host.firstChild) host.removeChild(host.firstChild);
        return host;
    }

    iconBtn(svgString, th, onclick) {
        const b = this.el("button",
            "display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:6px;cursor:pointer;outline:none;" +
            "border:1px solid " + th.border + ";background:transparent;color:" + th.fgMuted + ";transition:all 0.15s;");
        this.setSVG(b, svgString);
        b.onmouseover = () => { b.style.background = th.surfaceHover; b.style.color = th.fg; };
        b.onmouseout = () => { b.style.background = "transparent"; b.style.color = th.fgMuted; };
        b.onclick = onclick;
        return b;
    }

    // v3.3.75: chain diagnostic overlay -- shows which areas are in chain, which is last,
    // and which planning branch ran for each.
    _renderChainDiagOverlay() {
        try {
            const prior = document.getElementById("__prodplan_diag_overlay__");
            if (prior && prior.parentNode) prior.parentNode.removeChild(prior);
            const host = document.body || document.documentElement;
            if (!host) return;
            const di = this._diagPlanInfo || { chain: [], areas: {} };
            const box = document.createElement("div");
            box.id = "__prodplan_diag_overlay__";
            box.style.cssText = "position:fixed;top:8px;right:8px;z-index:2147483647;" +
                "background:rgba(20,20,30,0.97);color:#e8e8f0;font:11px/1.4 monospace;" +
                "padding:10px 12px;border:2px solid #56d364;border-radius:8px;max-width:680px;" +
                "max-height:85vh;overflow-y:auto;box-shadow:0 4px 16px rgba(0,0,0,0.5);" +
                "white-space:pre-wrap;word-break:break-word;pointer-events:auto;";
            const lines = ["[v3.5.1 same-week drain] click X to dismiss", ""];
            // -- CHAIN --
            lines.push("PRODUCTION CHAIN (length=" + di.chain.length + "):");
            if (di.chain.length === 0) {
                lines.push("  (empty — no chain detected!)");
            } else {
                for (const c of di.chain) {
                    const tag = (c.idx === di.chain.length - 1) ? " <== LAST" : "";
                    lines.push("  [" + c.idx + "] " + c.name + " (type=" + c.type + ", machines=" + c.machines.length + ")" + tag);
                    if (c.bufferAfter) lines.push("        bufferAfter: " + c.bufferAfter);
                    if (c.qualitySides && c.qualitySides.length) lines.push("        side-quality: " + c.qualitySides.join(", "));
                    lines.push("        afterIds: [" + c.afterIds.join(", ") + "]");
                    lines.push("        beforeIds: [" + c.beforeIds.join(", ") + "]");
                }
            }
            lines.push("");
            // -- ORPHAN AREAS (not in chain) -- afterIds + BFS resolved downstream --
            const orphans = di.orphans || {};
            const orphanNames = Object.keys(orphans).sort();
            if (orphanNames.length > 0) {
                lines.push("ORPHAN AREAS (not in chain — BFS resolution):");
                for (const on of orphanNames) {
                    const oi = orphans[on];
                    lines.push("  " + on + ":");
                    lines.push("        afterIds: [" + oi.afterIds.join(", ") + "]");
                    lines.push("        beforeIds: [" + oi.beforeIds.join(", ") + "]");
                    lines.push("        BFS downstream: " + (oi.resolvedDownstream || "(none — empty plan)"));
                    if (oi.resolvedBuffer) lines.push("        BFS buffer: " + oi.resolvedBuffer);
                }
                lines.push("");
            }
            // -- ALL AREAS WITH PLANS --
            lines.push("PER-AREA PLAN BRANCH:");
            const aNames = Object.keys(di.areas).sort();
            if (aNames.length === 0) {
                lines.push("  (no plans calculated yet)");
            }
            for (const an of aNames) {
                const ai = di.areas[an];
                const branch = ai.isLastArea ? "LAST (own goals)" : "MAINSTREAM (pull from " + (ai.downstream || "?") + ")";
                const orphan = ai.isOrphan ? " [ORPHAN]" : "";
                lines.push("  " + an + " (type=" + ai.type + ", chainIdx=" + ai.chainIdx + ")" + orphan);
                lines.push("        branch: " + branch);
                lines.push("        productNeeds: " + ai.productNeedsCount + " items");
                if (ai.topNeeds && ai.topNeeds.length) {
                    lines.push("        top needs: " + ai.topNeeds.map(t => t.name + "=" + t.total).join(", "));
                }
                if (ai.topCumDemand && ai.topCumDemand.length) {
                    lines.push("        top cumDemand (raw pull): " + ai.topCumDemand.map(t => t.name + "=" + t.total).join(", "));
                }
            }
            lines.push("");
            // -- v3.6.11: SHOT PEEN deep diagnostics --
            try {
                const sp = (this.areas || []).find(a => /^sho+t peen$/i.test(a.customName || ''));
                if (sp) {
                    lines.push("SHOT PEEN DEEP DIAG (v3.6.11):");
                    lines.push("  Machines:");
                    for (const m of (sp.machines || [])) {
                        lines.push("    " + m.name + ": parallelLanes=" + m.parallelLanes + ", laneGroupKey=" + m.laneGroupKey + ", allowedProducts=" + ((m.allowedProducts||[]).length));
                    }
                    lines.push("  productTypeLevelMap (key products):");
                    const tlm = this.productTypeLevelMap || {};
                    for (const p of ['GS17 Pinion','GS17 Ring','GS18 Pinion','GS18 Ring','GS19 Pinion','GS19 Ring','GS20 Pinion','GS20 Ring']) {
                        const e = tlm[p] || {};
                        lines.push("    " + p + ": TL1=" + e.typeLevel1 + " TL2=" + e.typeLevel2);
                    }
                    lines.push("  Downstreams (findAllDownstreamForArea):");
                    const dss = this._findAllDownstreamForArea(sp) || [];
                    for (let i=0; i<dss.length; i++) {
                        const d = dss[i];
                        const buf = d.bufferAfter;
                        const pufIdx = buf ? (buf.selectedPufferIdx ?? 'UNSET') : '-';
                        const pufData = (buf && this.dataPuffers && typeof pufIdx === 'number') ? this.dataPuffers[pufIdx] : null;
                        const pufName = pufData ? pufData.name : 'no data';
                        const pin20 = pufData?.data?.['GS20 Pinion'] ?? 'n/a';
                        lines.push("    [" + i + "] " + (d.downstreamArea?.customName) + " buffer:" + (buf?.customName || "direct") + " selectedPufferIdx=" + pufIdx + " (" + pufName + ", PIN-GS20=" + pin20 + ")");
                    }
                    // Also dump all buffer areas' selectedPufferIdx
                    lines.push("  All buffer areas:");
                    for (const a of (this.areas||[])) {
                        if (a.type !== 'buffer') continue;
                        const idx = a.selectedPufferIdx;
                        const pn = (typeof idx === 'number' && this.dataPuffers?.[idx]) ? this.dataPuffers[idx].name : '???';
                        lines.push("    " + a.customName + ": selectedPufferIdx=" + (idx ?? 'UNSET') + " -> " + pn);
                    }
                    // v3.6.11: bomMap + PIN-GS20 cascade
                    lines.push("  bomMap entries (key GS):");
                    const bm = this.bomMap || {};
                    for (const k of ['GS17','GS18','GS19','GS20']) {
                        const entry = bm[k];
                        if (!entry) { lines.push("    " + k + ": MISSING"); continue; }
                        lines.push("    " + k + ": " + JSON.stringify(entry));
                    }
                    lines.push("  bomMap total keys: " + Object.keys(bm).length);
                    lines.push("  PIN-GS20 cascade (cached plans):");
                    try {
                        const cascadeNames = ['Quality Inspection','Phosphate','Testing','Hard Turning Pinion','Straightering','Shoot Peen','Shot Peen','Furnace','Teeth Cutting','Soft Turning'];
                        for (const cn of cascadeNames) {
                            const a = (this.areas||[]).find(x => (x.customName||'').toLowerCase() === cn.toLowerCase());
                            if (!a || (a.machines||[]).length === 0) continue;
                            const p = this._planCache?.[a.id];
                            if (!p) { lines.push("    " + cn + ": (not cached)"); continue; }
                            let pinGS20 = 0, gs20 = 0, ringGS20 = 0;
                            for (const sl of (p.dailyPlan||[]).filter(s=>!s.isPast)) {
                                for (const m of sl.machines||[]) {
                                    for (const pp of (m.products||[])) {
                                        if (pp.qty>0) {
                                            if (pp.productName === 'GS20 Pinion') pinGS20 += pp.qty;
                                            else if (pp.productName === 'GS20') gs20 += pp.qty;
                                            else if (pp.productName === 'GS20 Ring') ringGS20 += pp.qty;
                                        }
                                    }
                                }
                            }
                            lines.push("    " + cn + ": GS20=" + gs20 + " PIN-GS20=" + pinGS20 + " RING-GS20=" + ringGS20);
                        }
                    } catch (_e2) { lines.push("    cascade err: " + _e2.message); }
                    // v3.6.11: Straightering's per-slot PIN-GS20 production (= Shot Peen's source demand)
                    try {
                        const strA = (this.areas||[]).find(x => (x.customName||'').toLowerCase() === 'straightering');
                        const strPlan = this._planCache?.[strA?.id];
                        if (strPlan) {
                            lines.push("  Straightering per-slot PIN-GS20 production:");
                            const nonPast = (strPlan.dailyPlan||[]).filter(s=>!s.isPast);
                            for (let i=0; i<nonPast.length; i++) {
                                const sl = nonPast[i];
                                let q = 0;
                                for (const m of (sl.machines||[])) {
                                    for (const pp of (m.products||[])) {
                                        if (pp.productName === 'GS20 Pinion' && pp.qty > 0) q += pp.qty;
                                    }
                                }
                                if (q > 0) lines.push("    slot " + i + " (" + sl.dayLabel + " " + sl.shiftLabel + "): " + q);
                            }
                        }
                    } catch (_e3) { lines.push("    str-slot err: " + _e3.message); }
                    const _saveCache = this._planCache;
                    this._planCache = {};
                    const _spPlan = this._calculateAreaPlan(sp);
                    this._planCache = _saveCache;
                    if (_spPlan) {
                        lines.push("  Shot Peen totals per product:");
                        const tot = {};
                        for (const sl of _spPlan.dailyPlan.filter(s=>!s.isPast)) {
                            for (const m of sl.machines) {
                                for (const p of (m.products||[])) if (p.qty>0) tot[p.productName] = (tot[p.productName]||0) + p.qty;
                            }
                        }
                        for (const k of Object.keys(tot).sort()) lines.push("    " + k + " = " + tot[k]);
                        lines.push("  First 6 non-past slots:");
                        for (const sl of _spPlan.dailyPlan.filter(s=>!s.isPast).slice(0,6)) {
                            for (const m of sl.machines) {
                                const prods = (m.products||[]).filter(p=>p.qty>0);
                                if (prods.length===0) continue;
                                const sum = prods.reduce((s,p)=>s+p.qty,0);
                                lines.push("    " + sl.dayLabel + " " + sl.shiftLabel + " " + m.machineName + ": " + prods.map(p=>p.productName+"="+p.qty).join(" | ") + " (" + sum + ")");
                            }
                        }
                    }
                    lines.push("");
                }
            } catch (_spe) { lines.push("SP diag err: " + _spe.message); lines.push(""); }
            // -- ALL AREAS BY TYPE (for context) --
            lines.push("ALL AREAS (type / machines):");
            for (const a of (this.areas || [])) {
                const nm = a.customName || a.name || a.id;
                const mc = (a.machines || []).length;
                lines.push("  " + nm + ": type=" + a.type + ", machines=" + mc + ", id=" + a.id);
            }
            box.textContent = lines.join("\n");
            const close = document.createElement("span");
            close.textContent = " [×]";
            close.style.cssText = "cursor:pointer;color:#ff7b72;font-weight:bold;float:right;margin-left:8px;";
            close.onclick = () => { if (box.parentNode) box.parentNode.removeChild(box); };
            box.appendChild(close);
            host.appendChild(box);
        } catch (_e) { /* diag overlay is best-effort; ignore */ }
    }

    // --- RENDER ---
    _renderDiagnosticOverlay() {
        try {
            // Remove any prior overlay so we always render fresh
            const prior = document.getElementById("__prodplan_diag_overlay__");
            if (prior && prior.parentNode) prior.parentNode.removeChild(prior);
            const d = this._diagInfo || null;
            const dvs = this._diagDvSummary || [];
            const fallbackUsed = !!(d && d.fallbackUsed);
            const noProdDv = !d;
            // ALWAYS append to document.body so render()'s target-clearing doesn't remove it
            const host = document.body || document.documentElement;
            if (!host) return;
            const box = document.createElement("div");
            box.id = "__prodplan_diag_overlay__";
            box.style.cssText = "position:fixed;top:8px;right:8px;z-index:2147483647;" +
                "background:rgba(20,20,30,0.97);color:#e8e8f0;font:11px/1.45 monospace;" +
                "padding:10px 12px;border:2px solid " + (fallbackUsed ? "#ff9800" : (noProdDv ? "#ff7b72" : "#56d364")) + ";" +
                "border-radius:8px;max-width:560px;box-shadow:0 4px 16px rgba(0,0,0,0.5);" +
                "white-space:pre-wrap;word-break:break-word;pointer-events:auto;";
            const header = (noProdDv
                ? "[v3.3.69 DIAG] NO production dataView received — see DVs below"
                : (fallbackUsed
                    ? "[v3.3.69 DIAG] FALLBACK USED — filter zeroed prod; using unfiltered."
                    : "[v3.3.69 DIAG] productionDV scan OK"));
            const lines = [header, ""];
            // DataViews summary (always shown)
            lines.push("dataViews received: " + dvs.length);
            for (const s of dvs) {
                lines.push("  DV[" + s.i + "] rows=" + s.rows + " cats=[" + s.catRoles + "] vals=[" + s.valRoles + "]");
            }
            lines.push("");
            if (d) {
                lines.push("productionDV scan:");
                lines.push("  rows: " + d.rows + "  sumProducedQty: " + d.sumProducedQty);
                lines.push("  machineBound: " + d.machineBound);
                lines.push("  filterPasses: " + d.filterPasses + " / rejects: " + d.filterRejects);
                lines.push("  curWk: " + d.curWk + "  nxtWk: " + d.nxtWk);
                lines.push("  filteredCurTotal: " + (d.filteredCurTotal != null ? d.filteredCurTotal : "?"));
                lines.push("  unfilteredCurTotal: " + (d.unfilteredCurTotal != null ? d.unfilteredCurTotal : "?"));
                lines.push("  lastAreaMachines: " + (d.lastAreaMachines ? d.lastAreaMachines.join(", ") : "(none)"));
                lines.push("  machinesInData: " + (d.machinesInData && d.machinesInData.length > 0 ? d.machinesInData.join(", ") : "(none/empty)"));
            } else {
                lines.push("NO productionDV — Power BI did not deliver a dataView with producedQty/machineName/buffer roles.");
                lines.push("This usually means InvalidUnconstrainedJoin: Machine Name is bound but Fact_BufferLevel /");
                lines.push("Fact_WeeklyGoal / Fact_Delivery have no Dim_Machine relationship. Power BI then drops the DV.");
            }
            if (this._diagLastError) {
                lines.push("");
                lines.push("readDataProducts error: " + this._diagLastError);
            }
            box.textContent = lines.join("\n");
            // Close button
            const close = document.createElement("span");
            close.textContent = " [×]";
            close.style.cssText = "cursor:pointer;color:#ff7b72;font-weight:bold;float:right;margin-left:8px;";
            close.onclick = () => { if (box.parentNode) box.parentNode.removeChild(box); };
            box.appendChild(close);
            host.appendChild(box);
        } catch (_e) { /* diag overlay is best-effort; ignore */ }
    }

    render() {
        this._planCache = {}; // Clear plan cache on each render
        while (this.target.firstChild) this.target.removeChild(this.target.firstChild);
        const th = THEMES[this.theme];
        const root = this.el("div",
            "display:flex;flex-direction:column;width:100%;height:100%;background:" + th.bg +
            ";color:" + th.fg + ";font-family:'Segoe UI',system-ui,sans-serif;font-size:13px;overflow:hidden;");
        const warn = this.buildBindingWarnings(th);
        if (warn) root.appendChild(warn);
        // v3.7.45: license banner — shown in Edit mode when no active license.
        if (this.isEditMode && this.licenseChecked && !this.hasValidLicense) {
            root.appendChild(this.buildLicenseBanner(th));
        }
        root.appendChild(this.buildHeader(th));
        root.appendChild(this.buildTabBar(th));
        root.appendChild(this.buildContent(th));
        this.target.appendChild(root);
    }

    // v3.3.10: Non-blocking banner for binding warnings. Dismissible per session via this._warningsDismissed.
    buildBindingWarnings(th) {
        const ws = this._bindingWarnings || [];
        if (!ws.length || this._warningsDismissed) return null;
        const lang = this.language || "en";
        const isDark = this.theme === "dark";
        // Pick most severe: error > warning > info
        const order = { error: 0, warning: 1, info: 2 };
        const sorted = ws.slice().sort((a, b) => (order[a.severity] || 3) - (order[b.severity] || 3));
        const top = sorted[0];
        const bgMap = {
            error:   isDark ? "#4a1f1f" : "#fde7e7",
            warning: isDark ? "#4a3a1f" : "#fff4d6",
            info:    isDark ? "#1f3a4a" : "#e0f0ff"
        };
        const brMap = {
            error:   isDark ? "#d94d4d" : "#d94d4d",
            warning: isDark ? "#d9a84d" : "#d9a84d",
            info:    isDark ? "#4d9fd9" : "#4d9fd9"
        };
        const iconMap = {
            error:   "\u26D4",   // no-entry
            warning: "\u26A0",   // warning triangle
            info:    "\u24D8"    // circled i
        };
        const container = this.el("div",
            "display:flex;align-items:flex-start;gap:10px;padding:8px 14px;" +
            "background:" + bgMap[top.severity] + ";" +
            "border-bottom:2px solid " + brMap[top.severity] + ";" +
            "color:" + th.fg + ";font-size:12px;line-height:1.45;flex-shrink:0;");
        const icon = this.el("span", "font-size:15px;line-height:1;margin-top:1px;");
        icon.textContent = iconMap[top.severity] || "!";
        container.appendChild(icon);

        const body = this.el("div", "flex:1;min-width:0;");
        const titleTxt = lang === "hu"
            ? (sorted.length > 1 ? ("Több bekötési figyelmeztetés (" + sorted.length + ")") : "Bekötési figyelmeztetés")
            : (sorted.length > 1 ? ("Multiple binding warnings (" + sorted.length + ")") : "Binding warning");
        const titleEl = this.el("div", "font-weight:600;margin-bottom:3px;");
        titleEl.textContent = titleTxt;
        body.appendChild(titleEl);
        for (const w of sorted) {
            const msg = this.el("div", "margin:2px 0;");
            const labelPrefix = w.field ? (w.field + ": ") : "";
            msg.textContent = labelPrefix + (lang === "hu" ? w.hu : w.en);
            body.appendChild(msg);
        }
        container.appendChild(body);

        const close = this.el("button",
            "cursor:pointer;border:none;background:transparent;color:" + th.fg +
            ";font-size:16px;line-height:1;padding:2px 6px;opacity:0.7;");
        close.textContent = "\u00D7";
        close.title = lang === "hu" ? "Elrejtés" : "Dismiss";
        close.onclick = () => { this._warningsDismissed = true; this.render(); };
        container.appendChild(close);
        return container;
    }

    buildHeader(th) {
        const header = this.el("div",
            "display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:" + th.surface +
            ";border-bottom:1px solid " + th.border + ";flex-shrink:0;");
        const left = this.el("div", "display:flex;align-items:center;gap:10px;");
        // v3.7.45: brand logo before the title (inline SVG data URI)
        const logo = document.createElement("img");
        logo.src = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0YWEzZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzM2ZDZlNyIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3YzVjZmYiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzEwMTYyYiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwODBiMTIiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiByeD0iNTYiIGZpbGw9InVybCgjYmcpIi8+CiAgPCEtLSBPRUUgZ2F1Z2UgcmluZyAoMy80IGNpcmNsZSkgLS0+CiAgPGNpcmNsZSBjeD0iMTI4IiBjeT0iMTI4IiByPSI3MiIgc3Ryb2tlPSIjMWMyNDM4IiBzdHJva2Utd2lkdGg9IjIyIiBmaWxsPSJub25lIgogICAgICAgICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSIzMzkgMTAwMCIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDEyOCAxMjgpIi8+CiAgPCEtLSBmaWxsZWQgcG9ydGlvbiAofjc4JSkgLS0+CiAgPGNpcmNsZSBjeD0iMTI4IiBjeT0iMTI4IiByPSI3MiIgc3Ryb2tlPSJ1cmwoI2cpIiBzdHJva2Utd2lkdGg9IjIyIiBmaWxsPSJub25lIgogICAgICAgICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSIyNjUgMTAwMCIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDEyOCAxMjgpIi8+CiAgPCEtLSBjZW50ZXIgcHJvZHVjdGlvbiBiYXJzIC0tPgogIDxyZWN0IHg9IjEwNiIgeT0iMTE4IiB3aWR0aD0iMTQiIGhlaWdodD0iMzYiIHJ4PSIzIiBmaWxsPSJ1cmwoI2cpIiBvcGFjaXR5PSIuNyIvPgogIDxyZWN0IHg9IjEyNCIgeT0iMTA0IiB3aWR0aD0iMTQiIGhlaWdodD0iNTAiIHJ4PSIzIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPHJlY3QgeD0iMTQyIiB5PSIxMjQiIHdpZHRoPSIxNCIgaGVpZ2h0PSIzMCIgcng9IjMiIGZpbGw9InVybCgjZykiIG9wYWNpdHk9Ii43Ii8+Cjwvc3ZnPgo=";
        logo.width = 22; logo.height = 22;
        logo.style.cssText = "flex-shrink:0;display:block;";
        left.appendChild(logo);
        const title = this.el("span", "font-size:14px;font-weight:600;color:" + th.fg + ";letter-spacing:-0.2px;");
        title.textContent = this.t("title");
        left.appendChild(title);
        // v3.6.11: small version badge.
        // v3.7.17: badge is now display-only — the SHOT PEEN diag popup
        // (hover/click on the badge) has been hidden per user request. The
        // _buildShotPeenDiagBlock helper stays in the code so the diag can
        // be re-enabled later by restoring the click/hover handlers here.
        const verBadgeWrap = this.el("span", "position:relative;display:inline-block;");
        const verBadge = this.el("span",
            "font-size:10px;font-weight:500;color:" + th.fgMuted +
            ";background:" + th.bg + ";padding:2px 6px;border-radius:4px;border:1px solid " + th.border + ";cursor:default;");
        verBadge.textContent = "v3.7.48";
        verBadgeWrap.appendChild(verBadge);
        left.appendChild(verBadgeWrap);
        header.appendChild(left);

        const right = this.el("div", "display:flex;gap:4px;align-items:center;");

        // Theme toggle — v3.7.19: text button (like Production Tracker), so the
        // light/dark switch is immediately discoverable. Previously a small
        // sun/moon iconBtn that was easy to miss.
        const themeBtn = this.el("button",
            "padding:4px 10px;border-radius:12px;cursor:pointer;font-size:11px;font-weight:600;" +
            "border:1px solid " + th.border + ";background:" + th.bg + ";color:" + th.fgMuted +
            ";transition:all 0.15s;outline:none;letter-spacing:0.3px;");
        themeBtn.textContent = this.theme === "dark"
            ? "☀ " + this.t("themeLight")
            : "🌙 " + this.t("themeDark");
        themeBtn.onmouseover = () => { themeBtn.style.borderColor = th.accent; themeBtn.style.color = th.accent; };
        themeBtn.onmouseout = () => { themeBtn.style.borderColor = th.border; themeBtn.style.color = th.fgMuted; };
        themeBtn.onclick = () => { this.theme = this.theme === "dark" ? "light" : "dark"; this.saveState(); this.render(); };
        right.appendChild(themeBtn);

        // Language toggle — 2-state: EN (default) ↔ HU.
        const langBtn = this.el("button",
            "padding:4px 10px;border-radius:12px;cursor:pointer;font-size:11px;font-weight:600;" +
            "border:1px solid " + th.border + ";background:" + th.bg + ";color:" + th.fgMuted +
            ";transition:all 0.15s;outline:none;letter-spacing:0.3px;");
        langBtn.textContent = this.language.toUpperCase();
        langBtn.onmouseover = () => { langBtn.style.borderColor = th.accent; langBtn.style.color = th.accent; };
        langBtn.onmouseout = () => { langBtn.style.borderColor = th.border; langBtn.style.color = th.fgMuted; };
        langBtn.onclick = () => {
            const next = this.language === "hu" ? "en" : "hu";
            this.language = next;
            this.saveState();
            this.render();
        };
        right.appendChild(langBtn);

        // Add area button
        const addBtn = this.el("button",
            "display:flex;align-items:center;gap:5px;padding:5px 12px;border-radius:6px;cursor:pointer;font-size:12px;" +
            "font-weight:500;border:none;outline:none;background:" + th.accent + ";color:#fff;transition:all 0.15s;");
        this.setSVG(addBtn, '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> ');
        addBtn.appendChild(document.createTextNode(" " + this.t("addArea")));
        addBtn.onmouseover = () => { addBtn.style.opacity = "0.85"; addBtn.style.transform = "translateY(-1px)"; };
        addBtn.onmouseout = () => { addBtn.style.opacity = "1"; addBtn.style.transform = "none"; };
        addBtn.onclick = () => this.showAreaModal(null);
        if (this.canEdit()) right.appendChild(addBtn);  // v3.7.45: editors only
        header.appendChild(right);
        return header;
    }

    // v3.3.70: return this.areas in chain order (topological sort by afterAreaIds),
    // matching the pipeline view. Areas with no upstream link iterate first; areas
    // are placed in the order they're reached when walking forward through the
    // chain. Newly created areas without yet-configured afterAreaIds end up at the
    // end of their connected component, which matches the pipeline's layout.
    _getOrderedAreas() {
        if (!this.areas || this.areas.length === 0) return [];
        const inDegree = new Map();
        const adjList = new Map();
        const idToArea = new Map();
        for (const a of this.areas) {
            inDegree.set(a.id, 0);
            adjList.set(a.id, []);
            idToArea.set(a.id, a);
        }
        for (const a of this.areas) {
            const afterIds = this._getAfterIds(a);
            for (const toId of afterIds) {
                if (!idToArea.has(toId)) continue;
                adjList.get(a.id).push(toId);
                inDegree.set(toId, (inDegree.get(toId) || 0) + 1);
            }
        }
        // Roots: zero in-degree, in original insertion order so deterministic
        let queue = this.areas.filter(a => (inDegree.get(a.id) || 0) === 0).map(a => a.id);
        const visited = new Set();
        const ordered = [];
        while (queue.length > 0) {
            // Process in queue order so we get a stable BFS layout
            const next = [];
            for (const id of queue) {
                if (visited.has(id)) continue;
                visited.add(id);
                ordered.push(idToArea.get(id));
                for (const toId of (adjList.get(id) || [])) {
                    inDegree.set(toId, (inDegree.get(toId) || 0) - 1);
                    if (inDegree.get(toId) <= 0 && !visited.has(toId)) {
                        next.push(toId);
                    }
                }
            }
            queue = next;
        }
        // Append any unreachable areas (cycles / disconnected) in original order
        for (const a of this.areas) {
            if (!visited.has(a.id)) ordered.push(a);
        }
        return ordered;
    }

    buildTabBar(th) {
        const bar = this.el("div",
            "display:flex;gap:4px;padding:8px 16px;background:" + th.bg +
            ";border-bottom:1px solid " + th.border + ";overflow-x:auto;flex-shrink:0;");

        // v3.3.30: persist horizontal scroll across re-renders so the tab bar
        // doesn\'t jump back to the start every time a tab is clicked.
        bar.addEventListener("scroll", () => {
            this._tabBarScrollLeft = bar.scrollLeft;
        }, { passive: true });
        const _restoreScroll = () => {
            if (typeof this._tabBarScrollLeft === "number") {
                bar.scrollLeft = this._tabBarScrollLeft;
            }
        };
        // Restore after browser paints the tabs
        if (typeof requestAnimationFrame === "function") {
            requestAnimationFrame(_restoreScroll);
        } else {
            setTimeout(_restoreScroll, 0);
        }

        // Logistics tab (always first)
        const logSel = this.selectedAreaId === "__logistics__";
        const logTab = this.el("div",
            "display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;cursor:pointer;" +
            "white-space:nowrap;user-select:none;font-size:12px;transition:all 0.15s;" +
            "background:" + (logSel ? th.greenSoft : "transparent") + ";color:" + (logSel ? th.green : th.fgMuted) +
            ";font-weight:" + (logSel ? "600" : "400") + ";");
        const logIcon = this.el("span", "display:flex;align-items:center;");
        this.setSVG(logIcon, '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>');
        logTab.appendChild(logIcon);
        const logLabel = this.el("span", "");
        logLabel.textContent = this.t("logistics");
        logTab.appendChild(logLabel);
        logTab.onmouseover = () => { if (!logSel) logTab.style.background = th.surfaceHover; };
        logTab.onmouseout = () => { if (!logSel) logTab.style.background = "transparent"; };
        logTab.onclick = () => { this.selectedAreaId = "__logistics__"; this.saveState(); this.render(); };
        bar.appendChild(logTab);

        // Pipeline map tab
        const mapSel = this.selectedAreaId === "__pipeline_map__";
        const mapTab = this.el("div",
            "display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;cursor:pointer;" +
            "white-space:nowrap;user-select:none;font-size:12px;transition:all 0.15s;" +
            "background:" + (mapSel ? th.accentSoft : "transparent") + ";color:" + (mapSel ? th.accent : th.fgMuted) +
            ";font-weight:" + (mapSel ? "600" : "400") + ";");
        const mapIcon = this.el("span", "display:flex;align-items:center;");
        this.setSVG(mapIcon, '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="6" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><line x1="7.5" y1="7.5" x2="10.5" y2="16.5"/><line x1="16.5" y1="7.5" x2="13.5" y2="16.5"/></svg>');
        mapTab.appendChild(mapIcon);
        const mapLabel = this.el("span", "");
        mapLabel.textContent = this.t("pipelineMap");
        mapTab.appendChild(mapLabel);
        mapTab.onmouseover = () => { if (!mapSel) mapTab.style.background = th.surfaceHover; };
        mapTab.onmouseout = () => { if (!mapSel) mapTab.style.background = "transparent"; };
        mapTab.onclick = () => { this.selectedAreaId = "__pipeline_map__"; this.saveState(); this.render(); };
        bar.appendChild(mapTab);

        // Gantt tab (v3.7.45: per-product schedule timeline)
        const ganttSel = this.selectedAreaId === "__gantt__";
        const ganttTab = this.el("div",
            "display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;cursor:pointer;" +
            "white-space:nowrap;user-select:none;font-size:12px;transition:all 0.15s;" +
            "background:" + (ganttSel ? th.purpleSoft : "transparent") + ";color:" + (ganttSel ? th.purple : th.fgMuted) +
            ";font-weight:" + (ganttSel ? "600" : "400") + ";");
        const ganttIcon = this.el("span", "display:flex;align-items:center;");
        this.setSVG(ganttIcon, '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="14" y2="6"/><line x1="7" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="11" y2="18"/></svg>');
        ganttTab.appendChild(ganttIcon);
        const ganttLabel = this.el("span", "");
        ganttLabel.textContent = this.t("ganttView");
        ganttTab.appendChild(ganttLabel);
        ganttTab.onmouseover = () => { if (!ganttSel) ganttTab.style.background = th.surfaceHover; };
        ganttTab.onmouseout = () => { if (!ganttSel) ganttTab.style.background = "transparent"; };
        ganttTab.onclick = () => { this.selectedAreaId = "__gantt__"; this.saveState(); this.render(); };
        bar.appendChild(ganttTab);

        // Area tabs (v3.3.70: chain-ordered, mirrors the pipeline view)
        this._getOrderedAreas().forEach(area => {
            const sel = area.id === this.selectedAreaId || this.selectedAreaId === ("__plan__" + area.id);
            const col = this.typeColor(area.type, th);
            const bgCol = this.typeBgColor(area.type, th);
            const tab = this.el("div",
                "display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;cursor:pointer;" +
                "white-space:nowrap;user-select:none;font-size:12px;transition:all 0.15s;" +
                "background:" + (sel ? bgCol : "transparent") + ";color:" + (sel ? col : th.fgMuted) +
                ";font-weight:" + (sel ? "600" : "400") + ";");
            const dot = this.el("span",
                "width:7px;height:7px;border-radius:50%;flex-shrink:0;background:" + col + ";" +
                (sel ? "box-shadow:0 0 6px " + col + ";" : "opacity:0.6;"));
            tab.appendChild(dot);
            const label = this.el("span", "");
            label.textContent = area.customName;
            tab.appendChild(label);
            // v3.3.54: per-tab delete handle removed entirely. The only
            // way to delete an area is now via the area edit modal
            // (Szerkesztés button on the area page → Törlés inside the
            // modal), so accidental tab-bar clicks can no longer destroy
            // configuration.
            tab.onmouseover = () => { if (!sel) tab.style.background = th.surfaceHover; };
            tab.onmouseout  = () => { if (!sel) tab.style.background = "transparent"; };
            tab.onclick = () => { this.selectedAreaId = area.id; this.saveState(); this.render(); };
            bar.appendChild(tab);
        });
        return bar;
    }

    buildContent(th) {
        const content = this.el("div", "flex:1;overflow:auto;padding:16px;background:" + th.bg + ";");

        // Logistics page
        if (this.selectedAreaId === "__logistics__") {
            content.appendChild(this.buildLogisticsPage(th));
            return content;
        }

        // Pipeline map page
        if (this.selectedAreaId === "__pipeline_map__") {
            content.appendChild(this.buildPipelineMapPage(th));
            return content;
        }

        // Gantt page
        if (this.selectedAreaId === "__gantt__") {
            content.appendChild(this.buildGanttPage(th));
            return content;
        }

        // Production plan dedicated page
        if (this.selectedAreaId && this.selectedAreaId.startsWith("__plan__")) {
            const areaId = this.selectedAreaId.replace("__plan__", "");
            const planArea = this.areas.find(a => a.id === areaId);
            if (planArea) {
                content.appendChild(this.buildPlanPage(planArea, th));
                return content;
            }
        }

        if (this.areas.length === 0) {
            content.appendChild(this.buildEmpty(th));
            return content;
        }
        // Ensure selected area exists
        if (!this.selectedAreaId || !this.areas.find(a => a.id === this.selectedAreaId || this.selectedAreaId.startsWith("__"))) {
            this.selectedAreaId = this.areas[0].id;
            this.saveState();
        }
        const area = this.areas.find(a => a.id === this.selectedAreaId);
        if (!area) { content.appendChild(this.buildEmpty(th)); return content; }

        // Area header
        const aCol = this.typeColor(area.type, th);
        const aBg = this.typeBgColor(area.type, th);
        const hdr = this.el("div", "display:flex;align-items:center;gap:10px;margin-bottom:16px;");
        const badge = this.el("span",
            "display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600;" +
            "background:" + aBg + ";color:" + aCol + ";");
        const bDot = this.el("span", "width:6px;height:6px;border-radius:50%;background:" + aCol + ";");
        badge.appendChild(bDot);
        badge.appendChild(document.createTextNode(this.t(area.type)));
        hdr.appendChild(badge);
        const aName = this.el("span", "font-size:18px;font-weight:600;color:" + th.fg + ";flex:1;");
        aName.textContent = area.customName;
        hdr.appendChild(aName);
        const editBtn = this.el("button",
            "display:flex;align-items:center;gap:5px;padding:5px 10px;border-radius:6px;cursor:pointer;font-size:11px;" +
            "font-weight:500;outline:none;transition:all 0.15s;border:1px solid " + th.border +
            ";background:transparent;color:" + th.fgMuted + ";");
        this.setSVG(editBtn, '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg> ');
        editBtn.appendChild(document.createTextNode(" " + this.t("edit")));
        editBtn.onmouseover = () => { editBtn.style.borderColor = th.accent; editBtn.style.color = th.accent; };
        editBtn.onmouseout = () => { editBtn.style.borderColor = th.border; editBtn.style.color = th.fgMuted; };
        editBtn.onclick = () => this.showAreaModal(area);
        if (this.canEdit()) hdr.appendChild(editBtn);  // v3.7.45: editors only
        content.appendChild(hdr);

        // Flow section
        const flowCard = this.el("div",
            "padding:16px;background:" + th.surface + ";border:1px solid " + th.border +
            ";border-radius:10px;box-shadow:" + th.shadow + ";margin-bottom:16px;");
        const flowLabel = this.el("div",
            "font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:" + th.fgMuted + ";margin-bottom:12px;");
        flowLabel.textContent = this.t("flow");
        flowCard.appendChild(flowLabel);
        const flowRow = this.el("div", "display:flex;align-items:center;gap:8px;flex-wrap:wrap;");
        const beforeIds = this._getBeforeIds(area);
        const afterIds = this._getAfterIds(area);
        const beforeAreas = beforeIds.map(id => this.areas.find(a => a.id === id)).filter(Boolean);
        const afterAreas = afterIds.map(id => this.areas.find(a => a.id === id)).filter(Boolean);
        if (beforeAreas.length > 0) {
            beforeAreas.forEach((ba, i) => {
                if (i > 0) {
                    const sep = this.el("span", "font-size:10px;color:" + th.fgMuted + ";");
                    sep.textContent = "+";
                    flowRow.appendChild(sep);
                }
                flowRow.appendChild(this.flowChip(ba, th, false));
            });
            const arr = this.el("span", "color:" + th.fgMuted + ";display:flex;");
            this.setSVG(arr, ICON_ARROW);
            flowRow.appendChild(arr);
        }
        flowRow.appendChild(this.flowChip(area, th, true));
        if (afterAreas.length > 0) {
            const arr = this.el("span", "color:" + th.fgMuted + ";display:flex;");
            this.setSVG(arr, ICON_ARROW);
            flowRow.appendChild(arr);
            afterAreas.forEach((aa, i) => {
                if (i > 0) {
                    const sep = this.el("span", "font-size:10px;color:" + th.fgMuted + ";");
                    sep.textContent = "+";
                    flowRow.appendChild(sep);
                }
                flowRow.appendChild(this.flowChip(aa, th, false));
            });
        }
        if (beforeAreas.length === 0 && afterAreas.length === 0) {
            const noLink = this.el("span", "font-size:12px;color:" + th.fgMuted + ";font-style:italic;");
            noLink.textContent = this.t("noLinkedAreas");
            flowRow.appendChild(noLink);
        }
        flowCard.appendChild(flowRow);
        content.appendChild(flowCard);

        // ====== SHIFT SCHEDULE SECTION (only for production and quality) ======
        if (area.type === "production" || area.type === "quality") {
            content.appendChild(this.buildShiftSchedule(area, th));
        }

        // ====== QUALITY PRODUCTS SECTION (only for quality) ======
        if (area.type === "quality") {
            content.appendChild(this.buildQualitySection(area, th));
        }

        // ====== MACHINES SECTION (production OR quality with machines) ======
        // v3.3.74: a quality area that has its own machines is a real chain stage
        // (e.g. Quality Inspection with QI-1 / QI-2 producing finished gearsets), so
        // it gets the same machine config + plan UI as a production area.
        const _isChainAreaForUI = (area.type === "production") ||
            (area.type === "quality" && area.machines && area.machines.length > 0);
        if (area.type === "production" || area.type === "quality") {
            content.appendChild(this.buildMachinesSection(area, th));
        }

        // ====== PRODUCTION PLAN BUTTON (chain stages) ======
        if (_isChainAreaForUI) {
            const planBtnWrap = this.el("div", "margin-top:4px;");
            const planBtn = this.el("button",
                "width:100%;padding:10px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;" +
                "border:1px solid " + th.accent + ";background:" + th.accentSoft + ";color:" + th.accent + ";" +
                "display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.15s;");
            this.setSVG(planBtn, '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>');
            planBtn.appendChild(document.createTextNode(this.t("showPlanPage")));
            planBtn.onmouseover = () => { planBtn.style.background = th.accent; planBtn.style.color = "#fff"; };
            planBtn.onmouseout = () => { planBtn.style.background = th.accentSoft; planBtn.style.color = th.accent; };
            planBtn.onclick = () => { this.selectedAreaId = "__plan__" + area.id; this.saveState(); this.render(); };
            planBtnWrap.appendChild(planBtn);
            content.appendChild(planBtnWrap);
        }

        // ====== PUFFER SECTION (only for buffer) ======
        if (area.type === "buffer") {
            content.appendChild(this.buildPufferSection(area, th));
        }

        return content;
    }

    buildPufferSection(area, th) {
        const card = this.el("div",
            "padding:16px;background:" + th.surface + ";border:1px solid " + th.border +
            ";border-radius:10px;box-shadow:" + th.shadow + ";margin-bottom:16px;");

        const titleRow = this.el("div", "display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;");
        const titleLabel = this.el("div",
            "font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:" + th.fgMuted + ";");
        titleLabel.textContent = this.t("pufferData");
        titleRow.appendChild(titleLabel);
        card.appendChild(titleRow);

        if (!this.dataPuffers || this.dataPuffers.length === 0) {
            const emptyWrap = this.el("div", "text-align:center;padding:24px 0;");
            const emptyIcon = this.el("div", "color:" + th.fgMuted + ";opacity:0.3;margin-bottom:8px;");
            this.setSVG(emptyIcon, '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>');
            emptyWrap.appendChild(emptyIcon);
            const emptyT = this.el("div", "font-size:12px;color:" + th.fgMuted + ";");
            emptyT.textContent = this.t("noPufferData");
            emptyWrap.appendChild(emptyT);
            const emptySub = this.el("div", "font-size:11px;color:" + th.fgMuted + ";opacity:0.7;margin-top:4px;");
            emptySub.textContent = this.t("noPufferDataSub");
            emptyWrap.appendChild(emptySub);
            card.appendChild(emptyWrap);
            return card;
        }

        // Dropdown to select puffer column
        if (!area.selectedPufferIdx) area.selectedPufferIdx = 0;
        if (area.selectedPufferIdx >= this.dataPuffers.length) area.selectedPufferIdx = 0;
        const opts = this.dataPuffers.map((p, i) => ({ value: String(i), label: p.name }));
        const sel = this.makeSelect(this.t("selectPufferCol"), opts, String(area.selectedPufferIdx), th);
        if (!this.canEdit()) sel.select.disabled = true;  // v3.7.45: viewers can't change the displayed puffer column
        sel.select.onchange = () => {
            area.selectedPufferIdx = parseInt(sel.select.value) || 0;
            this.saveState();
            this.render();
        };
        card.appendChild(sel.wrapper);

        // Bar chart for the selected puffer column
        const puffer = this.dataPuffers[area.selectedPufferIdx];
        if (puffer && puffer.data) {
            const products = Object.keys(puffer.data).sort();
            if (products.length > 0) {
                const maxQty = Math.max(...products.map(p => puffer.data[p] || 0), 1);
                // v3.7.22: use the same stable-hash + theme-aware palette as the
                // Plan / Pipeline Map views, so a product's color in its buffer
                // bar matches the color it gets on the production schedule.
                const palette = this._getPlanColors();

                const chartWrap = this.el("div", "margin-top:16px;");
                const chartLabel = this.el("div",
                    "font-size:11px;font-weight:600;color:" + th.fgMuted + ";margin-bottom:10px;text-transform:uppercase;letter-spacing:0.3px;");
                chartLabel.textContent = puffer.name + " — " + this.t("pufferQty");
                chartWrap.appendChild(chartLabel);

                products.forEach((pName) => {
                    const qty = puffer.data[pName] || 0;
                    if (!qty || qty <= 0) return; /* skip blank/zero rows */
                    const pct = Math.round((qty / maxQty) * 100);
                    // v3.7.23: family-aware tint via _getProductColor (parent + components same hue).
                    const color = this._getProductColor(pName) || palette[this._stableColorIdx(pName) % palette.length];

                    const row = this.el("div", "display:flex;align-items:center;gap:8px;margin-bottom:6px;");

                    const nameEl = this.el("div",
                        "font-size:11px;color:" + th.fg + ";width:100px;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;");
                    nameEl.textContent = pName;
                    nameEl.title = pName;
                    row.appendChild(nameEl);

                    const barOuter = this.el("div",
                        "flex:1;height:20px;border-radius:4px;background:" + th.bg + ";overflow:hidden;position:relative;");
                    const barInner = this.el("div",
                        "height:100%;border-radius:4px;transition:width 0.3s;background:" + color +
                        ";width:" + pct + "%;min-width:" + (qty > 0 ? "2px" : "0") + ";");
                    barOuter.appendChild(barInner);
                    row.appendChild(barOuter);

                    const qtyEl = this.el("div",
                        "font-size:11px;font-weight:600;color:" + th.fg + ";width:50px;text-align:right;flex-shrink:0;");
                    qtyEl.textContent = qty + " " + this.t("pcs");
                    row.appendChild(qtyEl);

                    chartWrap.appendChild(row);
                });

                card.appendChild(chartWrap);
            }
        }

        return card;
    }

    buildQualitySection(area, th) {
        if (!area.qualityProducts) area.qualityProducts = [];
        const section = this.el("div", "display:flex;flex-direction:column;gap:10px;margin-top:12px;");

        // Header row
        const hdr = this.el("div", "display:flex;align-items:center;justify-content:space-between;");
        const title = this.el("span", "font-size:14px;font-weight:600;color:" + th.fg + ";");
        title.textContent = this.t("qualityProducts");
        hdr.appendChild(title);

        const addBtn = this.el("button",
            "padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:600;" +
            "border:1px solid " + th.purple + ";background:transparent;color:" + th.purple + ";transition:all 0.15s;");
        addBtn.textContent = "+ " + this.t("addQualityProduct");
        addBtn.onmouseover = () => { addBtn.style.background = th.purple; addBtn.style.color = "#fff"; };
        addBtn.onmouseout = () => { addBtn.style.background = "transparent"; addBtn.style.color = th.purple; };
        addBtn.onclick = (e) => { e.stopPropagation(); this.showAddQualityProductModal(area, th); };
        if (this.canEdit()) hdr.appendChild(addBtn);  // v3.7.45: editors only
        section.appendChild(hdr);

        if (area.qualityProducts.length === 0) {
            const empty = this.el("div", "text-align:center;padding:20px;color:" + th.fgMuted + ";");
            const emptyIcon = this.el("div", "color:" + th.fgMuted + ";opacity:0.3;margin-bottom:8px;");
            this.setSVG(emptyIcon, '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>');
            empty.appendChild(emptyIcon);
            const emptyT = this.el("div", "font-size:12px;");
            emptyT.textContent = this.t("noQualityProducts");
            empty.appendChild(emptyT);
            const emptySub = this.el("div", "font-size:11px;color:" + th.fgMuted + ";opacity:0.7;margin-top:4px;");
            emptySub.textContent = this.t("noQualityProductsSub");
            empty.appendChild(emptySub);
            section.appendChild(empty);
            return section;
        }

        // Product cards grid
        const grid = this.el("div", "display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;");
        area.qualityProducts.forEach((qp, idx) => {
            const card = this.el("div",
                "padding:12px;background:" + th.bg + ";border:1px solid " + th.border +
                ";border-radius:10px;display:flex;flex-direction:column;gap:6px;");

            // Top row: product name + remove button
            const topRow = this.el("div", "display:flex;align-items:center;justify-content:space-between;gap:6px;");
            const nameWrap = this.el("div", "display:flex;flex-direction:column;gap:1px;");
            const nameLbl = this.el("span", "font-size:13px;font-weight:700;color:" + th.fg + ";");
            nameLbl.textContent = qp.name;
            nameWrap.appendChild(nameLbl);
            const ctLbl = this.el("span", "font-size:10px;color:" + th.purple + ";font-weight:600;");
            ctLbl.textContent = this.t("inspectionTime") + ": " + (qp.cycleTime || 0).toFixed(1) + " " + this.t("min");
            nameWrap.appendChild(ctLbl);
            topRow.appendChild(nameWrap);

            const rmBtn = this.el("button",
                "padding:2px 6px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:500;" +
                "border:1px solid " + th.red + ";background:transparent;color:" + th.red + ";transition:all 0.15s;flex-shrink:0;");
            rmBtn.textContent = "✕";
            rmBtn.title = this.t("removeProduct");
            rmBtn.onmouseover = () => { rmBtn.style.background = th.red; rmBtn.style.color = "#fff"; };
            rmBtn.onmouseout = () => { rmBtn.style.background = "transparent"; rmBtn.style.color = th.red; };
            rmBtn.onclick = (e) => {
                e.stopPropagation();
                area.qualityProducts.splice(idx, 1);
                this.saveState(); this.render();
            };
            if (this.canEdit()) topRow.appendChild(rmBtn);  // v3.7.45: editors only
            card.appendChild(topRow);

            // Editable cycle time row
            const ctRow = this.el("div", "display:flex;align-items:center;gap:6px;");
            const ctLabel = this.el("span", "font-size:10px;color:" + th.fgMuted + ";");
            ctLabel.textContent = this.t("qualityCycleTime") + ":";
            ctRow.appendChild(ctLabel);
            const ctInput = document.createElement("input");
            if (!this.canEdit()) ctInput.disabled = true;
            ctInput.type = "number";
            ctInput.value = qp.cycleTime || 0;
            ctInput.min = "0";
            ctInput.step = "0.1";
            ctInput.style.cssText = "width:70px;padding:4px 6px;border:1px solid " + th.border +
                ";border-radius:6px;background:" + th.surface + ";color:" + th.fg +
                ";font-size:12px;text-align:center;outline:none;";
            ctInput.onfocus = () => { ctInput.style.borderColor = th.purple; };
            ctInput.onblur = () => {
                ctInput.style.borderColor = th.border;
                const v = parseFloat(ctInput.value) || 0;
                if (v !== qp.cycleTime) {
                    qp.cycleTime = v;
                    this.saveState(); this.render();
                }
            };
            ctRow.appendChild(ctInput);
            const minLbl = this.el("span", "font-size:10px;color:" + th.fgMuted + ";");
            minLbl.textContent = this.t("min");
            ctRow.appendChild(minLbl);
            card.appendChild(ctRow);

            grid.appendChild(card);
        });
        section.appendChild(grid);

        // Capacity summary card
        if (area.qualityProducts.length > 0) {
            const capCard = this.el("div",
                "padding:12px;background:" + th.surface + ";border:1px solid " + th.border +
                ";border-radius:10px;box-shadow:" + th.shadow + ";");
            const capTitle = this.el("div",
                "font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.3px;color:" + th.fgMuted + ";margin-bottom:8px;");
            capTitle.textContent = this.language === "hu" ? "Kapacitás műszakonként" : "Capacity per shift";
            capCard.appendChild(capTitle);
            const shiftMins = this.getShiftMinutes(area);
            const stops = this.getTotalPlannedStop(area);
            const availMin = Math.max(0, shiftMins - stops);
            area.qualityProducts.forEach(qp => {
                const maxQty = qp.cycleTime > 0 ? Math.floor(availMin / qp.cycleTime) : 0;
                const row = this.el("div", "display:flex;justify-content:space-between;padding:3px 0;");
                const pn = this.el("span", "font-size:11px;color:" + th.fg + ";");
                pn.textContent = qp.name;
                row.appendChild(pn);
                const capVal = this.el("span", "font-size:11px;font-weight:700;color:" + th.purple + ";");
                capVal.textContent = maxQty + " " + this.t("pcs") + " / " + this.t("shift");
                row.appendChild(capVal);
                capCard.appendChild(row);
            });
            section.appendChild(capCard);
        }

        return section;
    }

    showAddQualityProductModal(area, th) {
        if (!area.qualityProducts) area.qualityProducts = [];
        this.closeModal();

        const overlay = this.el("div",
            "position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);" +
            "display:flex;align-items:center;justify-content:center;z-index:1000;");
        overlay.onclick = (e) => { if (e.target === overlay) this.closeModal(); };

        const modal = this.el("div",
            "background:" + th.surface + ";border:1px solid " + th.border + ";border-radius:12px;" +
            "padding:24px;width:340px;max-height:80%;overflow-y:auto;box-shadow:" + th.shadowLg + ";");

        // Title
        const titleEl = this.el("div", "font-size:16px;font-weight:700;color:" + th.fg + ";margin-bottom:16px;");
        titleEl.textContent = this.t("addQualityProduct");
        modal.appendChild(titleEl);

        // Product selection from dataProducts
        const existingNames = new Set(area.qualityProducts.map(p => p.name));
        const availableProducts = this.dataProducts.filter(p => !existingNames.has(p.name));

        let getProductName;
        if (availableProducts.length > 0) {
            const opts = availableProducts.map(p => ({ value: p.name, label: p.name }));
            const sel = this.makeSelect(this.t("selectProduct"), opts, opts[0]?.value || "", th);
            modal.appendChild(sel.wrapper);
            getProductName = () => sel.select.value;
        } else {
            // Allow manual input if no data products or all already added
            const nameInput = this.makeInput(this.t("productName"), "", th);
            modal.appendChild(nameInput.wrapper);
            getProductName = () => nameInput.input.value.trim();
        }

        // Cycle time input
        const ctInput = this.makeInput(this.t("qualityCycleTime"), "1.0", th);
        ctInput.input.type = "number";
        ctInput.input.min = "0";
        ctInput.input.step = "0.1";
        modal.appendChild(ctInput.wrapper);

        // Divider
        const divider = this.el("div", "height:1px;background:" + th.border + ";margin:16px 0 12px;");
        modal.appendChild(divider);

        // Buttons
        const btnRow = this.el("div", "display:flex;gap:8px;justify-content:flex-end;");
        const cancelBtn = this.el("button",
            "padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:500;" +
            "border:1px solid " + th.border + ";background:transparent;color:" + th.fg + ";transition:all 0.15s;");
        cancelBtn.textContent = this.t("cancel");
        cancelBtn.onmouseover = () => { cancelBtn.style.background = th.surfaceHover; };
        cancelBtn.onmouseout = () => { cancelBtn.style.background = "transparent"; };
        cancelBtn.onclick = () => this.closeModal();
        btnRow.appendChild(cancelBtn);

        const saveBtn = this.el("button",
            "padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;" +
            "border:none;background:" + th.purple + ";color:#fff;transition:all 0.15s;");
        saveBtn.textContent = this.t("save");
        saveBtn.onmouseover = () => { saveBtn.style.opacity = "0.85"; };
        saveBtn.onmouseout = () => { saveBtn.style.opacity = "1"; };
        saveBtn.onclick = () => {
            const name = getProductName();
            if (!name) return;
            const ct = parseFloat(ctInput.input.value) || 1.0;
            area.qualityProducts.push({ name: name, cycleTime: ct });
            this.saveState();
            this.closeModal();
            this.render();
        };
        btnRow.appendChild(saveBtn);
        modal.appendChild(btnRow);

        overlay.appendChild(modal);
        this.modalOverlay = overlay;
        this.target.style.position = "relative";
        this.target.appendChild(overlay);
    }

    buildPlanSection(area, th) {
        const card = this.el("div",
            "padding:16px;background:" + th.surface + ";border:1px solid " + th.border +
            ";border-radius:10px;box-shadow:" + th.shadow + ";margin-bottom:16px;");

        const plan = this._calculateAreaPlan(area);
        if (plan) this._applySupplyWarnings(area, plan);

        // Header with title + pipeline badge + week toggle
        const titleRow = this.el("div", "display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px;");
        const titleLeft = this.el("div", "display:flex;align-items:center;gap:8px;");
        const titleLabel = this.el("div",
            "font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:" + th.fgMuted + ";");
        titleLabel.textContent = this.t("productionPlan");
        titleLeft.appendChild(titleLabel);

        if (plan) {
            const badge = this.el("span",
                "display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:600;" +
                "background:" + th.accentSoft + ";color:" + th.accent + ";");
            badge.textContent = this.t("pipelinePos") + " " + (plan.chainPosition + 1) + "/" + plan.totalAreas +
                (plan.pipelineOffset > 0 ? " — " + plan.pipelineOffset + " " + this.t("shiftsAhead") : "");
            titleLeft.appendChild(badge);
        }
        titleRow.appendChild(titleLeft);

        // Week toggle buttons
        if (plan) {
            const viewWeek = area._planViewWeek || "this";
            const toggleWrap = this.el("div", "display:flex;border:1px solid " + th.border + ";border-radius:6px;overflow:hidden;");
            const btnThis = this.el("button",
                "padding:3px 10px;font-size:10px;font-weight:600;border:none;cursor:pointer;transition:all 0.15s;" +
                (viewWeek === "this"
                    ? "background:" + th.accent + ";color:#fff;"
                    : "background:transparent;color:" + th.fgMuted + ";"));
            btnThis.textContent = this.t("thisWeekView") + " (" + plan.curWeekNum + ")";
            btnThis.onclick = () => { area._planViewWeek = "this"; this.render(); };

            const btnNext = this.el("button",
                "padding:3px 10px;font-size:10px;font-weight:600;border:none;border-left:1px solid " + th.border + ";cursor:pointer;transition:all 0.15s;" +
                (viewWeek === "next"
                    ? "background:" + th.accent + ";color:#fff;"
                    : "background:transparent;color:" + th.fgMuted + ";"));
            btnNext.textContent = this.t("nextWeekView") + " (" + plan.nxtWeekNum + ")";
            btnNext.onclick = () => { area._planViewWeek = "next"; this.render(); };

            toggleWrap.appendChild(btnThis);
            toggleWrap.appendChild(btnNext);
            titleRow.appendChild(toggleWrap);
        }
        card.appendChild(titleRow);

        if (!plan) {
            const emptyWrap = this.el("div", "text-align:center;padding:24px 0;");
            const emptyIcon = this.el("div", "color:" + th.fgMuted + ";opacity:0.3;margin-bottom:8px;");
            this.setSVG(emptyIcon, '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>');
            emptyWrap.appendChild(emptyIcon);
            const emptyT = this.el("div", "font-size:12px;color:" + th.fgMuted + ";");
            emptyT.textContent = this.t("noPlan");
            emptyWrap.appendChild(emptyT);
            const emptySub = this.el("div", "font-size:11px;color:" + th.fgMuted + ";opacity:0.7;margin-top:4px;");
            emptySub.textContent = this.t("noPlanSub");
            emptyWrap.appendChild(emptySub);
            card.appendChild(emptyWrap);
            return card;
        }

        // Filter plan by selected week
        const viewWeek = area._planViewWeek || "this";
        const filteredSlots = viewWeek === "this"
            ? plan.dailyPlan.filter(d => d.week === plan.curWeekNum)
            : plan.dailyPlan.filter(d => d.week === plan.nxtWeekNum || d.isNextWeekGoal);
        const displaySlots = filteredSlots.length > 0 ? filteredSlots : plan.dailyPlan;

        // Group slots by day
        const dayMap = new Map();
        for (const slot of displaySlots) {
            if (!dayMap.has(slot.dateStr)) dayMap.set(slot.dateStr, { dayLabel: slot.dayLabel, isToday: slot.isToday, isPast: slot.isPast, dateStr: slot.dateStr, slots: [] });
            dayMap.get(slot.dateStr).slots.push(slot);
        }

        const bucketColors = {
            curDelivery: th.red || "#ff7b72",
            curGoal: th.accent || "#388bfd",
            nxtDelivery: th.amber || "#e3b341",
            nxtGoal: th.green || "#56d364"
        };
        const machineNames = [...new Set(plan.dailyPlan.flatMap(d => d.machines.map(m => m.machineName)))];
        const shiftLabelPrefix = this.language === "hu" ? "Műszak" : "Shift";

        // --- SUPPLY WARNING SUMMARY PANEL ---
        if (plan.supplyAnalysis && plan.supplyAnalysis.length > 0) {
            const hasWarnings = plan.supplyAnalysis.some(a => a.status === "warning");
            const panelBg = hasWarnings ? (th.amber || "#e3b341") + "12" : (th.green || "#56d364") + "0a";
            const panelBorder = hasWarnings ? (th.amber || "#e3b341") + "44" : (th.green || "#56d364") + "33";
            const swPanel = this.el("div",
                "padding:10px 14px;border:1px solid " + panelBorder + ";border-radius:8px;background:" + panelBg + ";margin-bottom:12px;");

            // Panel header (clickable toggle)
            const swHeader = this.el("div", "display:flex;align-items:center;gap:6px;cursor:pointer;");
            const swIcon = this.el("span", "display:flex;align-items:center;color:" + (hasWarnings ? (th.amber || "#e3b341") : (th.green || "#56d364")) + ";");
            this.setSVG(swIcon, hasWarnings ? ICON_WARNING : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>');
            swHeader.appendChild(swIcon);
            const swTitle = this.el("span", "font-size:11px;font-weight:700;color:" + (hasWarnings ? (th.amber || "#e3b341") : (th.green || "#56d364")) + ";");
            swTitle.textContent = this.t("supplyWarning") + " — " + plan.upstreamAreaName;
            swHeader.appendChild(swTitle);
            const swCount = this.el("span", "font-size:10px;color:" + th.fgMuted + ";margin-left:auto;");
            const warnCount = plan.supplyAnalysis.filter(a => a.status === "warning").length;
            const okCount = plan.supplyAnalysis.filter(a => a.status === "ok").length;
            swCount.textContent = hasWarnings ? (warnCount + " " + this.t("supplyWarning").toLowerCase() + " / " + okCount + " OK") : (okCount + " OK");
            swHeader.appendChild(swCount);
            const chevron = this.el("span", "display:flex;align-items:center;color:" + th.fgMuted + ";transition:transform 0.2s;");
            this.setSVG(chevron, ICON_CHEVRON_DOWN);
            swHeader.appendChild(chevron);
            swPanel.appendChild(swHeader);

            // Panel body (product table)
            const swBody = this.el("div", "margin-top:8px;");
            const isCollapsed = area._supplyPanelCollapsed !== false && !hasWarnings;
            swBody.style.display = isCollapsed ? "none" : "block";
            if (isCollapsed) chevron.style.transform = "rotate(-90deg)";

            swHeader.onclick = () => {
                const showing = swBody.style.display !== "none";
                swBody.style.display = showing ? "none" : "block";
                chevron.style.transform = showing ? "rotate(-90deg)" : "rotate(0deg)";
                area._supplyPanelCollapsed = showing;
            };

            // Table header
            const tblHdr = this.el("div", "display:grid;grid-template-columns:1fr 70px 70px 60px 60px 50px;gap:4px;padding:3px 0;border-bottom:1px solid " + th.border + ";margin-bottom:4px;");
            const hdrLabels = [this.t("product"), this.t("needed"), plan.upstreamAreaName, this.t("bufferStock"), this.t("supplyGap"), "%"];
            for (const lbl of hdrLabels) {
                const h = this.el("div", "font-size:8px;font-weight:700;color:" + th.fgMuted + ";text-transform:uppercase;letter-spacing:0.3px;" + (lbl !== hdrLabels[0] ? "text-align:right;" : ""));
                h.textContent = lbl;
                tblHdr.appendChild(h);
            }
            swBody.appendChild(tblHdr);

            // Product rows
            for (const item of plan.supplyAnalysis) {
                const isWarn = item.status === "warning";
                const rowColor = isWarn ? (th.amber || "#e3b341") : th.fg;
                const row = this.el("div", "display:grid;grid-template-columns:1fr 70px 70px 60px 60px 50px;gap:4px;padding:2px 0;align-items:center;");
                if (isWarn) row.style.background = (th.amber || "#e3b341") + "0a";

                // Product name
                const pName = this.el("div", "font-size:10px;font-weight:" + (isWarn ? "700" : "500") + ";color:" + rowColor + ";display:flex;align-items:center;gap:4px;overflow:hidden;");
                if (isWarn) {
                    const wi = this.el("span", "display:flex;align-items:center;flex-shrink:0;color:" + (th.amber || "#e3b341") + ";");
                    this.setSVG(wi, ICON_WARNING);
                    pName.appendChild(wi);
                }
                pName.appendChild(document.createTextNode(item.product));
                row.appendChild(pName);

                // Demand
                const demCell = this.el("div", "font-size:10px;font-weight:600;color:" + th.fg + ";text-align:right;");
                demCell.textContent = item.demand.toLocaleString();
                row.appendChild(demCell);

                // Upstream supply
                const supCell = this.el("div", "font-size:10px;font-weight:600;color:" + (isWarn ? rowColor : th.fg) + ";text-align:right;");
                supCell.textContent = item.supply.toLocaleString();
                row.appendChild(supCell);

                // Buffer
                const bufCell = this.el("div", "font-size:10px;color:" + th.fgMuted + ";text-align:right;");
                bufCell.textContent = item.buffer > 0 ? "+" + item.buffer : "—";
                row.appendChild(bufCell);

                // Gap
                const gapCell = this.el("div", "font-size:10px;font-weight:700;text-align:right;color:" + (isWarn ? (th.red || "#ff7b72") : (th.green || "#56d364")) + ";");
                gapCell.textContent = isWarn ? "-" + item.gap.toLocaleString() : "OK";
                row.appendChild(gapCell);

                // Coverage %
                const pctCell = this.el("div", "font-size:10px;font-weight:600;text-align:right;color:" + (item.pct >= 100 ? (th.green || "#56d364") : item.pct >= 80 ? (th.amber || "#e3b341") : (th.red || "#ff7b72")) + ";");
                pctCell.textContent = item.pct + "%";
                row.appendChild(pctCell);

                swBody.appendChild(row);
            }
            swPanel.appendChild(swBody);
            card.appendChild(swPanel);
        }

        // Day tile grid
        const dayGrid = this.el("div", "display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;");

        for (const [dateStr, dayData] of dayMap) {
            const dayCard = this.el("div",
                "padding:0;background:" + th.bg + ";border:1px solid " + (dayData.isToday ? th.accent : th.border) +
                ";border-radius:10px;overflow:hidden;" +
                (dayData.isPast ? "opacity:0.55;" : "") +
                (dayData.isToday ? "box-shadow:0 0 0 1px " + th.accent + ";" : ""));

            // Day header
            const dayHdr = this.el("div",
                "padding:8px 12px;font-size:13px;font-weight:700;" +
                "background:" + (dayData.isToday ? th.accentSoft : th.surface) +
                ";color:" + (dayData.isToday ? th.accent : th.fg) +
                ";border-bottom:1px solid " + th.border + ";display:flex;align-items:center;gap:6px;");
            dayHdr.textContent = dayData.dayLabel;
            if (dayData.isToday) {
                const todayBadge = this.el("span",
                    "font-size:9px;font-weight:600;padding:1px 6px;border-radius:4px;background:" + th.accent + ";color:#fff;");
                todayBadge.textContent = this.language === "hu" ? "MA" : "TODAY";
                dayHdr.appendChild(todayBadge);
            }
            dayCard.appendChild(dayHdr);

            // Machine rows inside day card
            const bodyWrap = this.el("div", "padding:8px 10px;display:flex;flex-direction:column;gap:6px;");

            for (const mName of machineNames) {
                const mRow = this.el("div", "display:flex;flex-direction:column;gap:3px;");

                // Machine name label
                const mLabel = this.el("div", "font-size:10px;font-weight:700;color:" + th.fg + ";margin-bottom:1px;");
                mLabel.textContent = mName;
                mRow.appendChild(mLabel);

                // Shift boxes for this machine on this day
                const shiftRow = this.el("div", "display:flex;gap:4px;");
                for (let si = 0; si < dayData.slots.length; si++) {
                    const slot = dayData.slots[si];
                    const mEntry = slot.machines.find(me => me.machineName === mName);

                    const shiftBox = this.el("div",
                        "flex:1;padding:5px 6px;border-radius:5px;display:flex;flex-direction:column;gap:1px;min-width:0;");

                    if (mEntry && mEntry.isDown) {
                        // Machine is down for this shift — show red indicator
                        shiftBox.style.background = (th.red || "#ff7b72") + "18";
                        shiftBox.style.border = "1px solid " + (th.red || "#ff7b72") + "44";
                        shiftBox.style.borderTop = "2px solid " + (th.red || "#ff7b72");
                        if (plan.shiftCount > 1) {
                            const sLbl = this.el("div", "font-size:7px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;");
                            sLbl.textContent = shiftLabelPrefix + " " + (si + 1);
                            shiftBox.appendChild(sLbl);
                        }
                        const offLbl = this.el("div", "font-size:11px;font-weight:700;color:" + (th.red || "#ff7b72") + ";");
                        offLbl.textContent = this.t("machineOff");
                        shiftBox.appendChild(offLbl);
                        const reasonLbl = this.el("div", "font-size:7px;font-weight:600;color:" + (th.red || "#ff7b72") + ";opacity:0.8;");
                        reasonLbl.textContent = mEntry.downReason === "planned" ? this.t("plannedMaint") : this.t("breakdown");
                        shiftBox.appendChild(reasonLbl);
                    } else if (mEntry && mEntry.qty > 0) {
                        const allProds = mEntry.products || [mEntry];
                        // v3.7.21: live theme-aware palette so dark<->light toggle repaints instantly.
                        // v3.7.23: family-aware tint — parent and BOM components share hue, differ by tint.
                        const _pal = this._getPlanColors();
                        const primaryColor = this._getProductColor(mEntry.productName)
                            || _pal[mEntry.colorIdx % _pal.length]
                            || th.accent;
                        const primaryBColor = bucketColors[mEntry.bucket] || th.accent;

                        if (allProds.length <= 1) {
                            // Single product — original display
                            shiftBox.style.background = primaryColor + "18";
                            shiftBox.style.border = "1px solid " + primaryColor + "33";
                            shiftBox.style.borderTop = "2px solid " + primaryBColor;
                        } else {
                            // Multi-product — gradient border
                            shiftBox.style.background = primaryColor + "10";
                            shiftBox.style.border = "1px solid " + primaryColor + "22";
                            shiftBox.style.borderTop = "2px solid " + primaryBColor;
                        }
                        // Supply warning: amber left border highlight
                        if (mEntry.supplyWarning) {
                            shiftBox.style.borderLeft = "3px solid " + (th.amber || "#e3b341");
                        }

                        if (plan.shiftCount > 1) {
                            const sLbl = this.el("div", "font-size:7px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;");
                            sLbl.textContent = shiftLabelPrefix + " " + (si + 1);
                            shiftBox.appendChild(sLbl);
                        }

                        // Render each product in this shift
                        for (let pi = 0; pi < allProds.length; pi++) {
                            const prod = allProds[pi];
                            const pColor = this._getProductColor(prod.productName)
                                || _pal[prod.colorIdx % _pal.length]
                                || th.accent;
                            const pBColor = bucketColors[prod.bucket] || th.accent;

                            if (pi > 0) {
                                // Separator line between products
                                const sep = this.el("div", "height:1px;background:" + th.border + ";margin:2px 0;opacity:0.4;");
                                shiftBox.appendChild(sep);
                            }

                            const prodLbl = this.el("div", "font-size:" + (allProds.length > 1 ? "9" : "10") + "px;font-weight:600;color:" + pColor + ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap;");
                            prodLbl.textContent = prod.productName;
                            prodLbl.title = prod.productName;
                            shiftBox.appendChild(prodLbl);

                            const qtyLbl = this.el("div", "font-size:" + (allProds.length > 1 ? "10" : "12") + "px;font-weight:700;color:" + th.fg + ";");
                            qtyLbl.textContent = prod.qty + " " + this.t("pcs");
                            shiftBox.appendChild(qtyLbl);

                            const priLbl = this.el("div", "font-size:7px;font-weight:600;color:" + pBColor + ";");
                            const bucketsToShow = prod.buckets && prod.buckets.length > 1 ? prod.buckets : [prod.bucket];
                            const bucketLabels2 = bucketsToShow.map(bk => {
                                const bKey = bk === "curDelivery" ? "curWeekDelivery" :
                                    bk === "curGoal" ? "curWeekGoal" :
                                    bk === "nxtDelivery" ? "nxtWeekDelivery" : "nxtWeekGoal";
                                return this.t(bKey);
                            });
                            priLbl.textContent = bucketLabels2.join(" + ");
                            shiftBox.appendChild(priLbl);

                            // Supply warning indicator
                            if (prod.supplyWarning) {
                                const warnRow = this.el("div", "display:flex;align-items:center;gap:3px;margin-top:2px;padding:1px 4px;border-radius:3px;background:" + (th.amber || "#e3b341") + "22;");
                                const warnIcon = this.el("span", "color:" + (th.amber || "#e3b341") + ";display:flex;align-items:center;flex-shrink:0;");
                                this.setSVG(warnIcon, ICON_WARNING);
                                warnRow.appendChild(warnIcon);
                                const warnTxt = this.el("span", "font-size:7px;font-weight:700;color:" + (th.amber || "#e3b341") + ";");
                                warnTxt.textContent = this.t("supplyWarning");
                                warnRow.appendChild(warnTxt);
                                warnRow.title = this.t("supplyWarningTip") + " (" + this.t("supplyGap") + ": " + prod.supplyGap + " " + this.t("pcs") + ")";
                                shiftBox.appendChild(warnRow);
                            }
                        }
                    } else {
                        shiftBox.style.background = th.surface;
                        shiftBox.style.border = "1px solid " + th.border + "44";
                        if (plan.shiftCount > 1) {
                            const sLbl = this.el("div", "font-size:7px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;");
                            sLbl.textContent = shiftLabelPrefix + " " + (si + 1);
                            shiftBox.appendChild(sLbl);
                        }
                        const emLbl = this.el("div", "font-size:11px;color:" + th.fgMuted + ";opacity:0.3;");
                        emLbl.textContent = "—";
                        shiftBox.appendChild(emLbl);
                    }
                    shiftRow.appendChild(shiftBox);
                }
                mRow.appendChild(shiftRow);
                bodyWrap.appendChild(mRow);
            }
            dayCard.appendChild(bodyWrap);
            dayGrid.appendChild(dayCard);
        }
        card.appendChild(dayGrid);

        // Legend
        const legendRow = this.el("div", "display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;align-items:center;");
        const legendLabel = this.el("span", "font-size:10px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;letter-spacing:0.3px;");
        legendLabel.textContent = this.t("legend") + ":";
        legendRow.appendChild(legendLabel);
        for (const p of plan.productNeeds) {
            const color = this._getProductColor(p.name)
                || this._getPlanColors()[p.colorIdx % this._getPlanColors().length];
            const item = this.el("span", "display:inline-flex;align-items:center;gap:3px;font-size:10px;color:" + th.fg + ";");
            const dot = this.el("span", "width:8px;height:8px;border-radius:2px;background:" + color + ";flex-shrink:0;");
            item.appendChild(dot);
            item.appendChild(document.createTextNode(p.name));
            legendRow.appendChild(item);
        }
        card.appendChild(legendRow);

        // Priority legend
        const priLegendRow = this.el("div", "display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;align-items:center;");
        const priLabel = this.el("span", "font-size:10px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;letter-spacing:0.3px;");
        priLabel.textContent = this.t("priority") + ":";
        priLegendRow.appendChild(priLabel);
        const priItems = [
            { color: bucketColors.curDelivery, label: this.t("curWeekDelivery") },
            { color: bucketColors.curGoal, label: this.t("curWeekGoal") },
            { color: bucketColors.nxtDelivery, label: this.t("nxtWeekDelivery") },
            { color: bucketColors.nxtGoal, label: this.t("nxtWeekGoal") }
        ];
        for (const pi of priItems) {
            const item = this.el("span", "display:inline-flex;align-items:center;gap:3px;font-size:10px;color:" + th.fg + ";");
            const bar = this.el("span", "width:14px;height:3px;border-radius:1px;background:" + pi.color + ";flex-shrink:0;");
            item.appendChild(bar);
            item.appendChild(document.createTextNode(pi.label));
            priLegendRow.appendChild(item);
        }
        card.appendChild(priLegendRow);

        // Supply warning legend (only if actual warnings exist)
        if (plan.hasSupplyWarnings) {
            const warnLegendRow = this.el("div", "display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;align-items:center;");
            const warnItem = this.el("span", "display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;background:" + (th.amber || "#e3b341") + "22;color:" + (th.amber || "#e3b341") + ";");
            const wIcon = this.el("span", "display:flex;align-items:center;");
            this.setSVG(wIcon, ICON_WARNING);
            warnItem.appendChild(wIcon);
            warnItem.appendChild(document.createTextNode(this.t("supplyWarning") + " — " + this.t("onlineProduction")));
            warnLegendRow.appendChild(warnItem);
            card.appendChild(warnLegendRow);
        }

        return card;
    }

    // Full-page production plan view (dedicated page)
    buildPipelineMapPage(th) {
        const wrap = this.el("div", "display:flex;flex-direction:column;gap:16px;height:100%;");

        // Title
        const titleEl = this.el("div", "font-size:18px;font-weight:700;color:" + th.fg + ";");
        titleEl.textContent = this.t("pipelineMap");
        wrap.appendChild(titleEl);

        // Build graph data: nodes (areas) and edges (connections)
        const nodes = [];
        const edges = [];
        const areaMap = new Map();
        this.areas.forEach(a => areaMap.set(a.id, a));

        // Identify all connections
        this.areas.forEach(a => {
            const afterIds = this._getAfterIds(a);
            for (const aid of afterIds) {
                edges.push({ from: a.id, to: aid });
            }
        });

        // Layout (v3.7.31): ALAP layering — each node's column is assigned by its
        // longest path to a sink, so branches RIGHT-align toward their convergence
        // point and the area→buffer→area structure collapses into clean alternating
        // columns. Vertical coords come from barycenter relaxation, so a convergence
        // node sits at the average height of its inputs (no tangled bypass routing).
        const succ = new Map(), pred = new Map();
        this.areas.forEach(a => { succ.set(a.id, []); pred.set(a.id, []); });
        edges.forEach(e => {
            if (succ.has(e.from)) succ.get(e.from).push(e.to);
            if (pred.has(e.to)) pred.get(e.to).push(e.from);
        });

        // longest distance from each node to a sink (memoized DFS, cycle-guarded)
        const distMemo = new Map();
        const calcDist = (id, stack) => {
            if (distMemo.has(id)) return distMemo.get(id);
            if (stack.has(id)) return 0;
            stack.add(id);
            let d = 0;
            for (const s of (succ.get(id) || [])) d = Math.max(d, 1 + calcDist(s, stack));
            stack.delete(id);
            distMemo.set(id, d);
            return d;
        };
        let maxDist = 0;
        this.areas.forEach(a => { const d = calcDist(a.id, new Set()); if (d > maxDist) maxDist = d; });
        const numCols = maxDist + 1;
        const colOf = new Map();
        this.areas.forEach(a => colOf.set(a.id, maxDist - (distMemo.get(a.id) || 0)));

        // group nodes per column; keep the area-array order as the initial row order
        const columns = Array.from({ length: numCols }, () => []);
        this.areas.forEach(a => columns[colOf.get(a.id)].push(a.id));

        // crossing reduction: a few barycenter ordering sweeps (down then up)
        const rowIdx = new Map();
        columns.forEach(col => col.forEach((id, i) => rowIdx.set(id, i)));
        const baryKey = (id, rel, adjCol) => {
            const ns = (rel.get(id) || []).filter(n => colOf.get(n) === adjCol);
            return ns.length ? ns.reduce((s, n) => s + rowIdx.get(n), 0) / ns.length : rowIdx.get(id);
        };
        for (let it = 0; it < 4; it++) {
            for (let c = 1; c < numCols; c++) {
                const key = new Map(columns[c].map(id => [id, baryKey(id, pred, c - 1)]));
                columns[c].sort((a, b) => key.get(a) - key.get(b));
                columns[c].forEach((id, i) => rowIdx.set(id, i));
            }
            for (let c = numCols - 2; c >= 0; c--) {
                const key = new Map(columns[c].map(id => [id, baryKey(id, succ, c + 1)]));
                columns[c].sort((a, b) => key.get(a) - key.get(b));
                columns[c].forEach((id, i) => rowIdx.set(id, i));
            }
        }

        // Node dimensions
        const nodeW = 180, nodeH = 90, gapX = 80, gapY = 40;
        const slot = nodeH + gapY;
        const totalW = numCols * (nodeW + gapX) - gapX;

        // vertical coordinate assignment: seed at index*slot, then relax toward the
        // average of neighbour heights (backward sweep, then forward), de-overlapping
        // within each column while preserving the row order computed above.
        const yOf = new Map();
        columns.forEach(col => col.forEach((id, i) => yOf.set(id, i * slot)));
        const placeCol = (c, rel, adjCol) => {
            const col = columns[c];
            col.forEach(id => {
                const ns = (rel.get(id) || []).filter(n => colOf.get(n) === adjCol);
                if (ns.length) yOf.set(id, ns.reduce((s, n) => s + yOf.get(n), 0) / ns.length);
            });
            for (let i = 1; i < col.length; i++) {
                const need = yOf.get(col[i - 1]) + slot;
                if (yOf.get(col[i]) < need) yOf.set(col[i], need);
            }
        };
        for (let it = 0; it < 6; it++) {
            if (it % 2 === 0) { for (let c = numCols - 2; c >= 0; c--) placeCol(c, succ, c + 1); }
            else { for (let c = 1; c < numCols; c++) placeCol(c, pred, c - 1); }
        }

        // normalize so the topmost node sits at y = 0; derive total height
        let _minY = Infinity, _maxY = -Infinity;
        this.areas.forEach(a => {
            const y = yOf.get(a.id);
            if (y < _minY) _minY = y;
            if (y + nodeH > _maxY) _maxY = y + nodeH;
        });
        if (!isFinite(_minY)) { _minY = 0; _maxY = nodeH; }
        const totalH = _maxY - _minY;

        const nodePos = new Map(); // id -> {x, y}
        this.areas.forEach(a => {
            nodePos.set(a.id, { x: colOf.get(a.id) * (nodeW + gapX), y: yOf.get(a.id) - _minY });
        });

        // SVG + nodes container
        const svgPad = 40;
        const containerW = totalW + nodeW + svgPad * 2;
        // Bypass-edges extra alul-térigénye
        let _extraH = 0;
        edges.forEach(_e => {
            const _f = nodePos.get(_e.from), _t = nodePos.get(_e.to);
            if (!_f || !_t) return;
            const _ld = Math.round((_t.x - _f.x) / (nodeW + gapX));
            if (_ld >= 2) {
                const _need = 35 + 18 * (_ld - 1) + 25;
                if (_need > _extraH) _extraH = _need;
            }
        });
        const containerH = totalH + nodeH + svgPad * 2 + _extraH;

        const container = this.el("div",
            "position:relative;overflow:auto;flex:1;min-height:300px;" +
            "border:1px solid " + th.border + ";border-radius:12px;background:" + th.surface + ";");

        const inner = this.el("div",
            "position:relative;width:" + containerW + "px;height:" + containerH + "px;margin:auto;");

        // SVG for edges
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", containerW);
        svg.setAttribute("height", containerH);
        svg.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;";

        // Arrow marker
        const defs = document.createElementNS(svgNS, "defs");
        const marker = document.createElementNS(svgNS, "marker");
        marker.setAttribute("id", "arrow-" + Date.now());
        marker.setAttribute("viewBox", "0 0 10 6");
        marker.setAttribute("refX", "10");
        marker.setAttribute("refY", "3");
        marker.setAttribute("markerWidth", "10");
        marker.setAttribute("markerHeight", "6");
        marker.setAttribute("orient", "auto-start-reverse");
        const arrowPath = document.createElementNS(svgNS, "path");
        arrowPath.setAttribute("d", "M 0 0 L 10 3 L 0 6 z");
        arrowPath.setAttribute("fill", th.accent);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const markerId = marker.getAttribute("id");

        // Refs for hover highlighting (v3.7.31): edge paths + node cards.
        const edgeEls = [];
        const nodeEls = new Map();

        // Draw edges
        edges.forEach(e => {
            const from = nodePos.get(e.from);
            const to = nodePos.get(e.to);
            if (!from || !to) return;

            const layerStep = nodeW + gapX;
            const layerDist = Math.round((to.x - from.x) / layerStep);
            const isSkip = layerDist >= 2;

            const line = document.createElementNS(svgNS, "path");

            if (isSkip) {
                // ORTOGONÁLIS routing: lefelé a forrás kártya aljából, vízszintesen alul, fel a célkártya aljához
                const xs = svgPad + from.x + nodeW / 2;        // forrás középső x
                const ys = svgPad + from.y + nodeH;            // forrás ALJA
                const xt = svgPad + to.x + nodeW / 2;          // cél középső x
                const yt = svgPad + to.y + nodeH;              // cél ALJA
                const yLow = Math.max(ys, yt) + 35 + 18 * (layerDist - 1);
                const r = 10;                                  // sarok-lekerekítés

                const dir = xt > xs ? 1 : -1;
                const path =
                    "M " + xs + " " + ys +
                    " L " + xs + " " + (yLow - r) +
                    " Q " + xs + " " + yLow + " " + (xs + r * dir) + " " + yLow +
                    " L " + (xt - r * dir) + " " + yLow +
                    " Q " + xt + " " + yLow + " " + xt + " " + (yLow - r) +
                    " L " + xt + " " + yt;
                line.setAttribute("d", path);
                line.setAttribute("stroke", th.warning || "#f59e0b");
                line.setAttribute("stroke-width", "2.5");
                line.setAttribute("fill", "none");
                line.setAttribute("stroke-opacity", "0.85");
                line.setAttribute("stroke-dasharray", "6,4");
                line.setAttribute("marker-end", "url(#" + markerId + ")");
            } else {
                // Normál szomszéd-edge: Bézier-görbe (eredeti)
                const x1 = svgPad + from.x + nodeW;
                const y1 = svgPad + from.y + nodeH / 2;
                const x2 = svgPad + to.x;
                const y2 = svgPad + to.y + nodeH / 2;
                const midX = (x1 + x2) / 2;
                line.setAttribute("d", "M " + x1 + " " + y1 + " C " + midX + " " + y1 + " " + midX + " " + y2 + " " + x2 + " " + y2);
                line.setAttribute("stroke", th.accent);
                line.setAttribute("stroke-width", "2");
                line.setAttribute("fill", "none");
                line.setAttribute("stroke-opacity", "0.5");
                line.setAttribute("marker-end", "url(#" + markerId + ")");
            }
            edgeEls.push({ el: line, from: e.from, to: e.to, baseWidth: isSkip ? 2.5 : 2 });
            svg.appendChild(line);
        });
        inner.appendChild(svg);

        // Draw nodes
        this.areas.forEach(a => {
            const pos = nodePos.get(a.id);
            if (!pos) return;

            const col = this.typeColor(a.type, th);
            const bgCol = this.typeBgColor(a.type, th);
            const machines = a.machines || [];
            const offset = a.shiftSettings?.shiftOffset || 0;

            const node = this.el("div",
                "position:absolute;left:" + (svgPad + pos.x) + "px;top:" + (svgPad + pos.y) + "px;" +
                "width:" + nodeW + "px;height:" + nodeH + "px;" +
                "background:" + th.surface + ";border:2px solid " + col + "44;border-radius:12px;" +
                "cursor:pointer;padding:10px;display:flex;flex-direction:column;justify-content:center;" +
                "transition:all 0.2s;box-shadow:" + th.shadow + ";");

            // Type badge
            const badge = this.el("div",
                "position:absolute;top:-8px;left:12px;font-size:9px;font-weight:700;text-transform:uppercase;" +
                "letter-spacing:0.5px;padding:2px 8px;border-radius:4px;background:" + col + ";color:" + th.bg + ";");
            badge.textContent = a.type === "production" ? this.t("production") :
                               a.type === "buffer" ? this.t("buffer") :
                               a.type === "quality" ? this.t("quality") : a.type;
            node.appendChild(badge);

            // Name
            const name = this.el("div", "font-size:13px;font-weight:700;color:" + th.fg + ";margin-top:4px;" +
                "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;");
            name.textContent = a.customName;
            node.appendChild(name);

            // Info line
            const info = this.el("div", "font-size:10px;color:" + th.fgMuted + ";margin-top:2px;");
            const parts = [];
            if (a.type === "production") {
                parts.push(machines.length + " " + this.t("machineCount"));
                if (offset > 0) parts.push(offset + " " + this.t("shiftsOffset"));
            }
            if (a.type === "quality") {
                const qpCount = (a.qualityProducts || []).length;
                parts.push(qpCount + " " + this.t("products"));
                if (offset > 0) parts.push(offset + " " + this.t("shiftsOffset"));
            }
            if (a.type === "buffer") {
                // Show buffer quantities summary
                const pufIdx = a.selectedPufferIdx || 0;
                const pufData = this.dataPuffers?.[pufIdx];
                if (pufData && pufData.data) {
                    const total = Object.values(pufData.data).reduce((s, v) => s + (v || 0), 0);
                    parts.push(this.t("bufferStock") + ": " + total + " " + this.t("pcs"));
                }
            }
            info.textContent = parts.join(" • ");
            node.appendChild(info);

            nodeEls.set(a.id, { el: node, col });

            // Hover effects: lift the hovered card + highlight its before/after chain
            node.onmouseover = () => {
                node.style.borderColor = col;
                node.style.transform = "scale(1.03)";
                node.style.boxShadow = "0 4px 20px " + col + "33";
                highlightChain(a.id);
            };
            node.onmouseout = () => {
                node.style.borderColor = col + "44";
                node.style.transform = "scale(1)";
                node.style.boxShadow = th.shadow;
                clearChain();
            };

            // Click → navigate to area (production → plan page, others → area page)
            node.onclick = () => {
                if (a.type === "production") {
                    this.selectedAreaId = "__plan__" + a.id;
                } else {
                    this.selectedAreaId = a.id;
                }
                this.saveState();
                this.render();
            };

            inner.appendChild(node);
        });

        // Hover highlight (v3.7.31): emphasise the hovered node together with its
        // direct upstream (before) and downstream (after) nodes + the edges that
        // connect them; everything else fades back.
        const highlightChain = (id) => {
            const keep = new Set([id, ...(pred.get(id) || []), ...(succ.get(id) || [])]);
            nodeEls.forEach((rec, nid) => { rec.el.style.opacity = keep.has(nid) ? "1" : "0.16"; });
            edgeEls.forEach(rec => {
                const active = rec.from === id || rec.to === id;
                rec.el.style.opacity = active ? "1" : "0.06";
                rec.el.setAttribute("stroke-width", active ? (rec.baseWidth + 1.5) : rec.baseWidth);
            });
        };
        const clearChain = () => {
            nodeEls.forEach(rec => { rec.el.style.opacity = "1"; });
            edgeEls.forEach(rec => {
                rec.el.style.opacity = "1";
                rec.el.setAttribute("stroke-width", rec.baseWidth);
            });
        };

        container.appendChild(inner);
        wrap.appendChild(container);
        return wrap;
    }

    buildPlanPage(area, th) {
        const wrap = this.el("div", "display:flex;flex-direction:column;gap:16px;");

        // Back button + title header
        const hdr = this.el("div", "display:flex;align-items:center;gap:12px;");
        const backBtn = this.el("button",
            "padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;" +
            "border:1px solid " + th.border + ";background:transparent;color:" + th.fg + ";display:flex;align-items:center;gap:4px;transition:all 0.15s;");
        this.setSVG(backBtn, '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>');
        backBtn.appendChild(document.createTextNode(this.t("backToArea")));
        backBtn.onmouseover = () => { backBtn.style.background = th.surfaceHover; };
        backBtn.onmouseout = () => { backBtn.style.background = "transparent"; };
        backBtn.onclick = () => { this.selectedAreaId = area.id; this.saveState(); this.render(); };
        hdr.appendChild(backBtn);

        const aCol = this.typeColor(area.type, th);
        const title = this.el("span", "font-size:18px;font-weight:700;color:" + th.fg + ";");
        title.textContent = this.t("productionPlan") + " — " + (area.customName || area.name || "");
        hdr.appendChild(title);
        wrap.appendChild(hdr);

        // Render the full plan section card
        wrap.appendChild(this.buildPlanSection(area, th));

        return wrap;
    }

    buildMachinesSection(area, th) {
        if (!area.machines) area.machines = [];
        const section = this.el("div", "display:flex;flex-direction:column;gap:10px;margin-top:12px;");

        // Header row
        const hdr = this.el("div", "display:flex;align-items:center;justify-content:space-between;");
        const title = this.el("span", "font-size:14px;font-weight:600;color:" + th.fg + ";");
        title.textContent = this.t("machines");
        hdr.appendChild(title);

        const addBtn = this.el("button",
            "padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:600;" +
            "border:1px solid " + th.accent + ";background:transparent;color:" + th.accent + ";transition:all 0.15s;");
        addBtn.textContent = "+ " + this.t("addMachine");
        addBtn.onmouseover = () => { addBtn.style.background = th.accent; addBtn.style.color = "#fff"; };
        addBtn.onmouseout = () => { addBtn.style.background = "transparent"; addBtn.style.color = th.accent; };
        addBtn.onclick = (e) => { e.stopPropagation(); this.showAddMachineModal(area, th); };
        if (this.canEdit()) hdr.appendChild(addBtn);  // v3.7.45: editors only
        section.appendChild(hdr);

        if (area.machines.length === 0) {
            const empty = this.el("div", "text-align:center;padding:20px;color:" + th.fgMuted + ";font-size:12px;");
            empty.textContent = this.t("noMachines");
            section.appendChild(empty);
            return section;
        }

        // Get today's plan for this area to show shift assignments on tiles
        const plan = this._calculateAreaPlan(area);
        const todayStr = this._toLocalDateStr(new Date());
        const shiftCount = area.shiftSettings?.shiftCount || 1;
        // Find today's shift entries (or next workday if today is weekend)
        let todaySlots = [];
        if (plan) {
            todaySlots = plan.dailyPlan.filter(s => s.isToday);
            if (todaySlots.length === 0) {
                // Weekend: show next available workday
                todaySlots = plan.dailyPlan.filter(s => !s.isPast).slice(0, shiftCount);
            }
        }
        const planColors = plan ? this._getPlanColors() : [];
        const shiftLabelPrefix = this.language === "hu" ? "Műszak" : "Shift";

        // Machine tile grid
        const grid = this.el("div", "display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;");
        area.machines.forEach((m, idx) => {
            // Collect cycle times
            const cts = [];
            for (const dp of this.dataProducts) {
                const ct = this.cycleTimeMap[m.name + "||" + dp.name];
                if (ct && ct > 0) cts.push(ct);
            }
            const ctMin = cts.length > 0 ? Math.min(...cts) : 0;
            const ctMax = cts.length > 0 ? Math.max(...cts) : 0;

            const card = this.el("div",
                "padding:12px;background:" + th.bg + ";border:1px solid " + th.border +
                ";border-radius:10px;display:flex;flex-direction:column;gap:8px;");

            // Top row: machine name + CT + remove button
            const topRow = this.el("div", "display:flex;align-items:center;justify-content:space-between;gap:6px;");
            const nameWrap = this.el("div", "display:flex;flex-direction:column;gap:1px;");
            const nameLbl = this.el("span", "font-size:13px;font-weight:700;color:" + th.fg + ";");
            nameLbl.textContent = m.name;
            nameWrap.appendChild(nameLbl);
            const ctLbl = this.el("span", "font-size:10px;color:" + th.fgMuted + ";");
            if (cts.length > 0) {
                ctLbl.textContent = "CT: " + ctMin.toFixed(1) + (ctMin !== ctMax ? " – " + ctMax.toFixed(1) : "") + " " + this.t("min");
            } else {
                ctLbl.textContent = "CT: —";
            }
            nameWrap.appendChild(ctLbl);
            // Allowed products info under CT
            if (m.allowedProducts && m.allowedProducts.length > 0) {
                const apLbl = this.el("span", "font-size:9px;color:" + th.green + ";");
                apLbl.textContent = this.t("validatedFor") + ": " + m.allowedProducts.join(", ");
                nameWrap.appendChild(apLbl);
            }
            topRow.appendChild(nameWrap);

            // Product capability button
            const prodBtn = this.el("button",
                "padding:2px 6px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:500;" +
                "border:1px solid " + th.green + ";background:transparent;color:" + th.green + ";transition:all 0.15s;flex-shrink:0;");
            prodBtn.textContent = "☰";
            prodBtn.title = this.t("configProducts");
            prodBtn.onmouseover = () => { prodBtn.style.background = th.green; prodBtn.style.color = "#000"; };
            prodBtn.onmouseout = () => { prodBtn.style.background = "transparent"; prodBtn.style.color = th.green; };
            prodBtn.onclick = (e) => { e.stopPropagation(); this.showMachineProductsModal(area, m, th); };

            // Downtime button
            const dtBtn = this.el("button",
                "padding:2px 6px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:500;" +
                "border:1px solid " + th.amber + ";background:transparent;color:" + th.amber + ";transition:all 0.15s;flex-shrink:0;");
            dtBtn.textContent = "⚙";
            dtBtn.title = this.t("setDowntime");
            dtBtn.onmouseover = () => { dtBtn.style.background = th.amber; dtBtn.style.color = "#000"; };
            dtBtn.onmouseout = () => { dtBtn.style.background = "transparent"; dtBtn.style.color = th.amber; };
            dtBtn.onclick = (e) => { e.stopPropagation(); this.showMachineDowntimeModal(area, m, th); };

            const rmBtn = this.el("button",
                "padding:2px 6px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:500;" +
                "border:1px solid " + th.red + ";background:transparent;color:" + th.red + ";transition:all 0.15s;flex-shrink:0;");
            rmBtn.textContent = "✕";
            rmBtn.title = this.t("removeMachine");
            rmBtn.onmouseover = () => { rmBtn.style.background = th.red; rmBtn.style.color = "#fff"; };
            rmBtn.onmouseout = () => { rmBtn.style.background = "transparent"; rmBtn.style.color = th.red; };
            rmBtn.onclick = (e) => {
                e.stopPropagation();
                area.machines.splice(idx, 1);
                this.saveState(); this.render();
            };
            const btnWrap = this.el("div", "display:flex;gap:4px;flex-shrink:0;");
            btnWrap.appendChild(prodBtn);
            btnWrap.appendChild(dtBtn);
            btnWrap.appendChild(rmBtn);
            if (this.canEdit()) topRow.appendChild(btnWrap);  // v3.7.45: editors only — viewers see machines but can't edit product/downtime/remove
            card.appendChild(topRow);

            // Show active downtime summary if any
            const dtEntries = m.downtime ? Object.entries(m.downtime).filter(([d, v]) => v && (v.allDay || (v.shifts && v.shifts.length > 0))) : [];
            if (dtEntries.length > 0) {
                const dtSummary = this.el("div", "display:flex;flex-wrap:wrap;gap:3px;");
                for (const [dStr, dVal] of dtEntries.slice(0, 5)) {
                    const dayLabel = new Date(dStr + "T00:00:00").toLocaleDateString(this.language === "hu" ? "hu-HU" : "en-US", { weekday: "short", month: "numeric", day: "numeric" });
                    const shiftInfo = dVal.allDay ? this.t("allShifts") : (dVal.shifts || []).map(s => "M" + (s + 1)).join(",");
                    const badge = this.el("span",
                        "font-size:8px;font-weight:600;padding:1px 5px;border-radius:3px;background:" + (th.red || "#ff7b72") + "22;color:" + (th.red || "#ff7b72") + ";");
                    badge.textContent = dayLabel + " " + shiftInfo + " (" + (dVal.reason === "planned" ? this.t("plannedMaint") : this.t("breakdown")) + ")";
                    dtSummary.appendChild(badge);
                }
                if (dtEntries.length > 5) {
                    const more = this.el("span", "font-size:8px;color:" + th.fgMuted + ";");
                    more.textContent = "+" + (dtEntries.length - 5);
                    dtSummary.appendChild(more);
                }
                card.appendChild(dtSummary);
            }

            // Shift assignments for today/next workday
            if (todaySlots.length > 0) {
                const shiftGrid = this.el("div", "display:flex;gap:4px;flex-wrap:wrap;");
                for (let si = 0; si < todaySlots.length; si++) {
                    const slot = todaySlots[si];
                    const mEntry = slot.machines.find(me => me.machineName === m.name);
                    const shiftBox = this.el("div",
                        "flex:1;min-width:70px;padding:6px 8px;border-radius:6px;display:flex;flex-direction:column;gap:2px;" +
                        "border:1px solid " + th.border + ";");

                    if (shiftCount > 1) {
                        const shiftTitle = this.el("div", "font-size:8px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;letter-spacing:0.3px;");
                        shiftTitle.textContent = shiftLabelPrefix + " " + (si + 1);
                        shiftBox.appendChild(shiftTitle);
                    }

                    if (mEntry && mEntry.isDown) {
                        shiftBox.style.background = (th.red || "#ff7b72") + "15";
                        shiftBox.style.borderColor = (th.red || "#ff7b72") + "44";
                        shiftBox.style.borderTop = "2px solid " + (th.red || "#ff7b72");
                        const offLbl = this.el("div", "font-size:10px;font-weight:700;color:" + (th.red || "#ff7b72") + ";");
                        offLbl.textContent = this.t("machineOff");
                        shiftBox.appendChild(offLbl);
                        const rLbl = this.el("div", "font-size:8px;color:" + (th.red || "#ff7b72") + ";opacity:0.8;");
                        rLbl.textContent = mEntry.downReason === "planned" ? this.t("plannedMaint") : this.t("breakdown");
                        shiftBox.appendChild(rLbl);
                    } else if (mEntry && mEntry.qty > 0) {
                        const allProds = mEntry.products || [mEntry];
                        const color = this._getProductColor(mEntry.productName)
                            || planColors[mEntry.colorIdx % planColors.length]
                            || th.accent;
                        const bColor = mEntry.bucket === "curDelivery" ? (th.red || "#ff7b72") :
                            mEntry.bucket === "curGoal" ? (th.accent || "#388bfd") :
                            mEntry.bucket === "nxtDelivery" ? (th.amber || "#e3b341") :
                            (th.green || "#56d364");
                        shiftBox.style.background = color + "15";
                        shiftBox.style.borderColor = color + "44";
                        shiftBox.style.borderTop = "2px solid " + bColor;

                        for (let pi = 0; pi < allProds.length; pi++) {
                            const prod = allProds[pi];
                            const pColor = this._getProductColor(prod.productName)
                                || planColors[prod.colorIdx % planColors.length]
                                || th.accent;
                            const pBColor = prod.bucket === "curDelivery" ? (th.red || "#ff7b72") :
                                prod.bucket === "curGoal" ? (th.accent || "#388bfd") :
                                prod.bucket === "nxtDelivery" ? (th.amber || "#e3b341") :
                                (th.green || "#56d364");

                            if (pi > 0) {
                                const sep = this.el("div", "height:1px;background:" + th.border + ";margin:2px 0;opacity:0.4;");
                                shiftBox.appendChild(sep);
                            }

                            const prodLbl = this.el("div", "font-size:" + (allProds.length > 1 ? "9" : "11") + "px;font-weight:600;color:" + pColor + ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap;");
                            prodLbl.textContent = prod.productName;
                            prodLbl.title = prod.productName;
                            shiftBox.appendChild(prodLbl);

                            const qtyLbl = this.el("div", "font-size:" + (allProds.length > 1 ? "11" : "13") + "px;font-weight:700;color:" + th.fg + ";");
                            qtyLbl.textContent = prod.qty + " " + this.t("pcs");
                            shiftBox.appendChild(qtyLbl);

                            if (prod.bucket) {
                                const priLbl = this.el("div", "font-size:7px;font-weight:600;color:" + pBColor + ";");
                                const bucketsToShow = prod.buckets && prod.buckets.length > 1 ? prod.buckets : [prod.bucket];
                                const bucketLabels2 = bucketsToShow.map(bk => {
                                    const bKey = bk === "curDelivery" ? "curWeekDelivery" :
                                        bk === "curGoal" ? "curWeekGoal" :
                                        bk === "nxtDelivery" ? "nxtWeekDelivery" : "nxtWeekGoal";
                                    return this.t(bKey);
                                });
                                priLbl.textContent = bucketLabels2.join(" + ");
                                shiftBox.appendChild(priLbl);
                            }
                        }
                    } else {
                        const emptyLbl = this.el("div", "font-size:11px;color:" + th.fgMuted + ";opacity:0.4;");
                        emptyLbl.textContent = "—";
                        shiftBox.appendChild(emptyLbl);
                    }
                    shiftGrid.appendChild(shiftBox);
                }
                card.appendChild(shiftGrid);
            }

            grid.appendChild(card);
        });
        section.appendChild(grid);
        return section;
    }

    showAddMachineModal(area, th) {
        if (!area.machines) area.machines = [];
        this.closeModal();

        const overlay = this.el("div",
            "position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);" +
            "display:flex;align-items:center;justify-content:center;z-index:1000;");
        overlay.onclick = (e) => { if (e.target === overlay) this.closeModal(); };

        const modal = this.el("div",
            "background:" + th.surface + ";border:1px solid " + th.border + ";border-radius:12px;" +
            "padding:24px;width:340px;max-height:80%;overflow-y:auto;box-shadow:" + th.shadowLg + ";");

        // Title
        const titleEl = this.el("div", "font-size:16px;font-weight:700;color:" + th.fg + ";margin-bottom:16px;");
        titleEl.textContent = this.t("addMachine");
        modal.appendChild(titleEl);

        // v3.7+: Mode toggle — Real machine (from data) vs Virtual machine.
        // Virtual machines let the user split one physical Excel machine
        // (e.g. SP-1) into multiple logical machines (SP-1 Pinion, SP-1 Ring)
        // and reuse the original cycle times via cycleTimeAlias.
        const hasMachineData = this.dataMachines && this.dataMachines.length > 0;
        const existingNames = new Set((area.machines || []).map(m => m.name));

        const modeRow = this.el("div", "display:flex;gap:6px;margin-bottom:14px;");
        const realBtn = this.el("button",
            "flex:1;padding:7px 8px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:600;outline:none;" +
            "border:1px solid " + th.border + ";background:" + th.accent + ";color:#fff;");
        realBtn.textContent = this.t("machineKindReal");
        const virtBtn = this.el("button",
            "flex:1;padding:7px 8px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:600;outline:none;" +
            "border:1px solid " + th.border + ";background:transparent;color:" + th.fg + ";");
        virtBtn.textContent = this.t("machineKindVirtual");
        modeRow.appendChild(realBtn);
        modeRow.appendChild(virtBtn);
        modal.appendChild(modeRow);

        // Container that holds the active form (real or virtual)
        const formHost = this.el("div", "");
        modal.appendChild(formHost);

        let mode = "real"; // current mode
        let getNameValue = () => "";
        let getCycleTimeAlias = () => null;

        // ----- helpers -----
        const renderCTPreview = (machineNameOrAlias) => {
            const ctPreview = this.el("div",
                "margin-top:8px;padding:8px 10px;background:" + th.bg +
                ";border:1px solid " + th.border + ";border-radius:8px;font-size:11px;color:" + th.fgMuted + ";");
            const lbl = this.el("div",
                "font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.3px;color:" + th.fgMuted + ";margin-bottom:6px;");
            lbl.textContent = this.t("cycleTime");
            ctPreview.appendChild(lbl);
            let found = false;
            for (const dp of this.dataProducts) {
                const ct = this.cycleTimeMap[machineNameOrAlias + "||" + dp.name];
                if (ct && ct > 0) {
                    found = true;
                    const row = this.el("div", "display:flex;justify-content:space-between;padding:2px 0;");
                    const pn = this.el("span", "color:" + th.fg + ";");
                    pn.textContent = dp.name;
                    row.appendChild(pn);
                    const cv = this.el("span", "font-weight:600;color:" + th.accent + ";");
                    cv.textContent = ct.toFixed(2) + " " + this.t("min");
                    row.appendChild(cv);
                    ctPreview.appendChild(row);
                }
            }
            if (!found) {
                const noData = this.el("span", "font-style:italic;");
                noData.textContent = "—";
                ctPreview.appendChild(noData);
            }
            return ctPreview;
        };

        const renderRealForm = () => {
            this.clearNode(formHost);
            if (!hasMachineData) {
                const nameInput = this.makeInput(this.t("selectMachine"), "", th);
                formHost.appendChild(nameInput.wrapper);
                getNameValue = () => nameInput.input.value.trim();
                getCycleTimeAlias = () => null;
                return;
            }
            const available = this.dataMachines.filter(m => !existingNames.has(m.name));
            const opts = available.map(m => ({ value: m.name, label: m.name }));
            const sel = this.makeSelect(this.t("selectMachine"), opts, "", th);
            formHost.appendChild(sel.wrapper);
            const previewSlot = this.el("div", "");
            const update = (name) => {
                this.clearNode(previewSlot);
                previewSlot.appendChild(renderCTPreview(name));
            };
            sel.select.onchange = () => update(sel.select.value);
            if (available.length > 0) update(available[0].name);
            formHost.appendChild(previewSlot);
            getNameValue = () => sel.select.value;
            getCycleTimeAlias = () => null;
        };

        const renderVirtualForm = () => {
            this.clearNode(formHost);

            // Custom name input
            const nameInput = this.makeInput(this.t("virtualMachineName"), "", th);
            const hint1 = this.el("div", "font-size:10px;color:" + th.fgMuted + ";margin-top:-2px;margin-bottom:6px;font-style:italic;");
            hint1.textContent = this.t("virtualMachineNameHint");
            formHost.appendChild(nameInput.wrapper);
            formHost.appendChild(hint1);

            // Base/alias selector
            const aliasWrap = this.el("div", "margin-top:10px;");
            formHost.appendChild(aliasWrap);
            if (hasMachineData) {
                const aliasOpts = [{ value: "", label: "—" }].concat(this.dataMachines.map(m => ({ value: m.name, label: m.name })));
                const aliasSel = this.makeSelect(this.t("cycleTimeAlias"), aliasOpts, "", th);
                aliasWrap.appendChild(aliasSel.wrapper);
                const hint2 = this.el("div", "font-size:10px;color:" + th.fgMuted + ";margin-top:-2px;font-style:italic;");
                hint2.textContent = this.t("cycleTimeAliasHint");
                aliasWrap.appendChild(hint2);
                const previewSlot = this.el("div", "");
                aliasWrap.appendChild(previewSlot);
                const updatePrev = (alias) => {
                    this.clearNode(previewSlot);
                    if (alias) previewSlot.appendChild(renderCTPreview(alias));
                };
                aliasSel.select.onchange = () => updatePrev(aliasSel.select.value);
                getCycleTimeAlias = () => aliasSel.select.value || null;
            } else {
                getCycleTimeAlias = () => null;
            }
            getNameValue = () => nameInput.input.value.trim();
        };

        const setMode = (newMode) => {
            mode = newMode;
            if (mode === "real") {
                realBtn.style.background = th.accent;
                realBtn.style.color = "#fff";
                virtBtn.style.background = "transparent";
                virtBtn.style.color = th.fg;
                renderRealForm();
            } else {
                virtBtn.style.background = th.accent;
                virtBtn.style.color = "#fff";
                realBtn.style.background = "transparent";
                realBtn.style.color = th.fg;
                renderVirtualForm();
            }
        };
        realBtn.onclick = () => setMode("real");
        virtBtn.onclick = () => setMode("virtual");
        setMode("real");

        // Divider
        const divider = this.el("div", "height:1px;background:" + th.border + ";margin:16px 0 12px;");
        modal.appendChild(divider);

        // Buttons
        const btnRow = this.el("div", "display:flex;gap:8px;justify-content:flex-end;");
        const cancelBtn = this.el("button",
            "padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:500;outline:none;" +
            "border:1px solid " + th.border + ";background:transparent;color:" + th.fg + ";");
        cancelBtn.textContent = this.t("cancel");
        cancelBtn.onclick = () => this.closeModal();
        btnRow.appendChild(cancelBtn);

        const saveBtn = this.el("button",
            "padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;outline:none;" +
            "border:none;background:" + th.accent + ";color:#fff;");
        saveBtn.textContent = this.t("save");
        saveBtn.onclick = () => {
            const name = getNameValue();
            if (!name) return;
            if (existingNames.has(name)) return;
            const newMachine = { name: name };
            const alias = getCycleTimeAlias();
            if (alias) newMachine.cycleTimeAlias = alias;
            area.machines.push(newMachine);
            this.closeModal();
            this.saveState(); this.render();
        };
        btnRow.appendChild(saveBtn);
        modal.appendChild(btnRow);

        overlay.appendChild(modal);
        this.target.appendChild(overlay);
        this.modalOverlay = overlay;
    }

    showMachineProductsModal(area, machine, th) {
        this.closeModal();

        const overlay = this.el("div",
            "position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);" +
            "display:flex;align-items:center;justify-content:center;z-index:1000;");
        overlay.onclick = (e) => { if (e.target === overlay) this.closeModal(); };

        const modal = this.el("div",
            "background:" + th.surface + ";border:1px solid " + th.border + ";border-radius:12px;" +
            "padding:24px;width:380px;max-height:80%;overflow-y:auto;box-shadow:" + th.shadowLg + ";");

        const titleEl = this.el("div", "font-size:16px;font-weight:700;color:" + th.fg + ";margin-bottom:4px;");
        titleEl.textContent = machine.name + " — " + this.t("productCapability");
        modal.appendChild(titleEl);

        const subtitle = this.el("div", "font-size:11px;color:" + th.fgMuted + ";margin-bottom:16px;");
        subtitle.textContent = this.language === "hu"
            ? "Jelöld be a termékeket, amelyeket ez a gép gyárthat. Ha nincs kijelölve semmi, minden terméket gyárthat."
            : "Select products this machine can produce. If none selected, all products are allowed.";
        modal.appendChild(subtitle);

// v3.7.31: Parallel Production controls (parallelLanes / laneGroupKey / machineGroupKey) removed from setup.

        // v3.7+: cycleTimeAlias editor — change which physical machine this
        // virtual machine inherits cycle times from. Only shown if data is bound.
        if (this.dataMachines && this.dataMachines.length > 0) {
            const aliasRow = this.el("div",
                "display:flex;flex-direction:column;gap:6px;padding:10px;border-radius:6px;" +
                "background:" + th.bg + ";border:1px solid " + th.border + ";margin-bottom:12px;");
            const aliasHead = this.el("div", "");
            const aliasTitle = this.el("div", "font-size:12px;font-weight:600;color:" + th.fg + ";");
            aliasTitle.textContent = this.t("cycleTimeAlias");
            aliasHead.appendChild(aliasTitle);
            const aliasHint = this.el("div", "font-size:10px;color:" + th.fgMuted + ";margin-top:2px;");
            aliasHint.textContent = this.t("cycleTimeAliasHint");
            aliasHead.appendChild(aliasHint);
            aliasRow.appendChild(aliasHead);

            const aliasSel = this.el("select",
                "padding:5px 8px;font-size:12px;background:" + th.surface + ";color:" + th.fg +
                ";border:1px solid " + th.border + ";border-radius:6px;cursor:pointer;outline:none;");
            const noneOpt = this.el("option"); noneOpt.value = ""; noneOpt.textContent = "—"; aliasSel.appendChild(noneOpt);
            for (const dm of this.dataMachines) {
                const opt = this.el("option"); opt.value = dm.name; opt.textContent = dm.name; aliasSel.appendChild(opt);
            }
            aliasSel.value = machine.cycleTimeAlias || "";
            aliasRow.appendChild(aliasSel);
            modal.appendChild(aliasRow);
            // Stash refs on closure used by save
            this._tmpAliasSel = aliasSel;
        } else {
            this._tmpAliasSel = null;
        }

        // "All products" toggle
        const currentAllowed = machine.allowedProducts ? [...machine.allowedProducts] : [];
        const isAll = currentAllowed.length === 0;

        const allRow = this.el("div",
            "display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:6px;" +
            "background:" + th.bg + ";border:1px solid " + th.border + ";margin-bottom:8px;cursor:pointer;");
        const allCb = this.el("input");
        allCb.type = "checkbox";
        allCb.checked = isAll;
        allCb.style.cssText = "cursor:pointer;width:16px;height:16px;accent-color:" + th.accent + ";";
        allRow.appendChild(allCb);
        const allLbl = this.el("span", "font-size:12px;font-weight:600;color:" + th.fg + ";");
        allLbl.textContent = this.t("allProducts");
        allRow.appendChild(allLbl);
        const allHint = this.el("span", "font-size:10px;color:" + th.fgMuted + ";margin-left:auto;");
        allHint.textContent = this.language === "hu" ? "(nincs korlátozás)" : "(no restriction)";
        allRow.appendChild(allHint);
        modal.appendChild(allRow);

        // Product checkboxes
        const productList = this.el("div", "display:flex;flex-direction:column;gap:4px;");
        const productCheckboxes = [];

        // Get all known products (from data + cycleTimeMap for this machine).
        // v3.7+: also look up the machine's cycleTimeAlias so split machines
        // (e.g. SP-1 Pinion -> alias SP-1) see their parent's CT products.
        const allProductNames = new Set(this.dataProducts.map(p => p.name));
        const _ctKey = machine.cycleTimeAlias || machine.name;
        for (const key in this.cycleTimeMap) {
            const parts = key.split("||");
            if ((parts[0] === machine.name || parts[0] === _ctKey) && parts[1]) {
                allProductNames.add(parts[1]);
            }
        }

        for (const pName of [...allProductNames].sort()) {
            const row = this.el("div",
                "display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;" +
                "background:" + th.bg + ";border:1px solid " + th.border + ";cursor:pointer;");
            const cb = this.el("input");
            cb.type = "checkbox";
            cb.checked = isAll || currentAllowed.includes(pName);
            cb.disabled = isAll;
            cb.style.cssText = "cursor:pointer;width:16px;height:16px;accent-color:" + th.green + ";";
            const lbl = this.el("span", "font-size:12px;color:" + th.fg + ";");
            lbl.textContent = pName;
            row.appendChild(cb);
            row.appendChild(lbl);

            // Show CT if available (using alias-aware lookup)
            const ct = this.cycleTimeMap[_ctKey + "||" + pName];
            if (ct && ct > 0) {
                const ctInfo = this.el("span", "font-size:10px;color:" + th.fgMuted + ";margin-left:auto;");
                ctInfo.textContent = "CT: " + ct.toFixed(1) + " " + this.t("min");
                row.appendChild(ctInfo);
            }

            row.onclick = (e) => { if (e.target !== cb) cb.click(); };
            productList.appendChild(row);
            productCheckboxes.push({ cb, name: pName });
        }

        // "All products" toggle logic
        allCb.onchange = () => {
            for (const pc of productCheckboxes) {
                pc.cb.disabled = allCb.checked;
                if (allCb.checked) pc.cb.checked = true;
            }
        };
        allRow.onclick = (e) => { if (e.target !== allCb) allCb.click(); };

        // v3.7+: Quick-select rows — for each TL level, render chips for each
        // distinct value (e.g. TL1: Pinion | Ring | GearSet). Clicking a chip
        // TOGGLES every product whose TL matches: if all are currently checked
        // the chip unchecks them, otherwise it checks them all.
        const _typeLevelMap = this.productTypeLevelMap || {};
        const _qsContainer = this.el("div",
            "display:flex;flex-direction:column;gap:6px;padding:10px;border-radius:6px;" +
            "background:" + th.bg + ";border:1px solid " + th.border + ";margin-bottom:8px;");
        const _qsTitle = this.el("div", "font-size:12px;font-weight:600;color:" + th.fg + ";");
        _qsTitle.textContent = this.t("quickSelectByLevel");
        _qsContainer.appendChild(_qsTitle);
        const _qsHint = this.el("div", "font-size:10px;color:" + th.fgMuted + ";margin-top:-2px;");
        _qsHint.textContent = this.t("quickSelectHint");
        _qsContainer.appendChild(_qsHint);

        const _qsBuildRow = (levelKey, labelKey) => {
            // Find distinct values of this level among the displayed products
            const valueToProducts = {};
            for (const pc of productCheckboxes) {
                const entry = _typeLevelMap[pc.name] || {};
                const v = entry[levelKey];
                if (v == null || v === "") continue;
                const key = String(v);
                if (!valueToProducts[key]) valueToProducts[key] = [];
                valueToProducts[key].push(pc);
            }
            const keys = Object.keys(valueToProducts).sort();
            if (keys.length === 0) return null;

            const row = this.el("div", "display:flex;align-items:center;gap:6px;flex-wrap:wrap;");
            const rowLbl = this.el("span",
                "font-size:11px;font-weight:600;color:" + th.fgMuted + ";min-width:34px;");
            rowLbl.textContent = this.t(labelKey) + ":";
            row.appendChild(rowLbl);

            for (const v of keys) {
                const chip = this.el("button",
                    "padding:3px 9px;border-radius:12px;cursor:pointer;font-size:11px;font-weight:600;outline:none;" +
                    "border:1px solid " + th.border + ";background:" + th.surface + ";color:" + th.fg + ";");
                chip.textContent = v;
                const refresh = () => {
                    const pcs = valueToProducts[v];
                    const allChecked = pcs.every(pc => pc.cb.checked);
                    const anyChecked = pcs.some(pc => pc.cb.checked);
                    if (allChecked) {
                        chip.style.background = th.accent;
                        chip.style.color = "#fff";
                        chip.style.borderColor = th.accent;
                    } else if (anyChecked) {
                        chip.style.background = th.bg;
                        chip.style.color = th.accent;
                        chip.style.borderColor = th.accent;
                    } else {
                        chip.style.background = th.surface;
                        chip.style.color = th.fg;
                        chip.style.borderColor = th.border;
                    }
                };
                chip.onclick = () => {
                    if (allCb.checked) return; // disabled while "all products" is on
                    const pcs = valueToProducts[v];
                    const allChecked = pcs.every(pc => pc.cb.checked);
                    for (const pc of pcs) pc.cb.checked = !allChecked;
                    // Refresh all chips since selection changed
                    for (const r of _qsRefreshers) r();
                };
                _qsRefreshers.push(refresh);
                refresh();
                row.appendChild(chip);
            }
            return row;
        };
        const _qsRefreshers = [];
        for (const [lvl, lblKey] of [["typeLevel1","quickTL1"], ["typeLevel2","quickTL2"], ["typeLevel3","quickTL3"]]) {
            const r = _qsBuildRow(lvl, lblKey);
            if (r) _qsContainer.appendChild(r);
        }
        // Only show the section if any row was added (>2 children = title + hint + at least one row)
        if (_qsContainer.children.length > 2) {
            modal.appendChild(_qsContainer);
        }

        // Sync chip state when individual product checkboxes are toggled
        const _refreshAllChips = () => { for (const r of _qsRefreshers) r(); };
        for (const pc of productCheckboxes) {
            pc.cb.addEventListener("change", _refreshAllChips);
        }
        // Also sync chips when the "All products" master toggle flips
        const _prevAllChange = allCb.onchange;
        allCb.onchange = () => {
            if (typeof _prevAllChange === "function") _prevAllChange();
            _refreshAllChips();
        };

        modal.appendChild(productList);

        // Save / Cancel
        const btnRow = this.el("div", "display:flex;gap:8px;justify-content:flex-end;margin-top:16px;");
        const cancelBtn = this.el("button",
            "padding:6px 16px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:600;" +
            "border:1px solid " + th.border + ";background:transparent;color:" + th.fgMuted + ";");
        cancelBtn.textContent = this.t("cancel");
        cancelBtn.onclick = () => this.closeModal();
        btnRow.appendChild(cancelBtn);

        const saveBtn = this.el("button",
            "padding:6px 16px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:600;border:none;" +
            "background:" + th.accent + ";color:#fff;");
        saveBtn.textContent = this.t("save");
        saveBtn.onclick = () => {
            if (allCb.checked) {
                // All products allowed — clear restriction
                machine.allowedProducts = [];
            } else {
                machine.allowedProducts = productCheckboxes.filter(pc => pc.cb.checked).map(pc => pc.name);
            }
            // v3.7.31: Parallel Production removed from setup — neutralise so the
            // machine runs a single product stream (no lanes / sister grouping).
            machine.parallelLanes = 1;
            delete machine.laneGroupKey;
            delete machine.sameParentLanes;
            delete machine.machineGroupKey;
            delete machine.machineGroupBindKey;
            if (this._tmpAliasSel) {
                const _alias = (this._tmpAliasSel.value || "").trim();
                if (_alias) machine.cycleTimeAlias = _alias;
                else delete machine.cycleTimeAlias;
            }
            this._tmpAliasSel = null;
            this.closeModal();
            this.saveState();
            this.render();
        };
        btnRow.appendChild(saveBtn);
        modal.appendChild(btnRow);

        overlay.appendChild(modal);
        this.target.appendChild(overlay);
        this.modalOverlay = overlay;
    }

    showMachineDowntimeModal(area, machine, th) {
        this.closeModal();
        if (!machine.downtime) machine.downtime = {};

        const shiftCount = area.shiftSettings?.shiftCount || 1;
        const wdpw = this._getAreaWorkDaysPerWeek(area);
        const allDays = this._getPlanWorkdays(wdpw);

        const overlay = this.el("div",
            "position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);" +
            "display:flex;align-items:center;justify-content:center;z-index:1000;");
        overlay.onclick = (e) => { if (e.target === overlay) this.closeModal(); };

        const modal = this.el("div",
            "background:" + th.surface + ";border:1px solid " + th.border + ";border-radius:12px;" +
            "padding:24px;width:420px;max-height:80%;overflow-y:auto;box-shadow:" + th.shadowLg + ";");

        // Title
        const titleEl = this.el("div", "font-size:16px;font-weight:700;color:" + th.fg + ";margin-bottom:4px;");
        titleEl.textContent = machine.name + " — " + this.t("machineDowntime");
        modal.appendChild(titleEl);

        const subtitle = this.el("div", "font-size:11px;color:" + th.fgMuted + ";margin-bottom:16px;");
        subtitle.textContent = this.language === "hu"
            ? "Kattints a műszakokra a ki/bekapcsoláshoz. Piros = leállás."
            : "Click shifts to toggle availability. Red = downtime.";
        modal.appendChild(subtitle);

        // Reason selector
        const reasonRow = this.el("div", "display:flex;align-items:center;gap:8px;margin-bottom:12px;");
        const reasonLabel = this.el("span", "font-size:11px;font-weight:600;color:" + th.fgMuted + ";");
        reasonLabel.textContent = this.t("downtimeReason") + ":";
        reasonRow.appendChild(reasonLabel);
        let selectedReason = "breakdown";
        const reasons = [
            { key: "breakdown", label: this.t("breakdown") },
            { key: "planned", label: this.t("plannedMaint") }
        ];
        const reasonBtns = [];
        for (const r of reasons) {
            const btn = this.el("button",
                "padding:3px 10px;font-size:10px;font-weight:600;border-radius:4px;cursor:pointer;border:1px solid " + th.border + ";" +
                "transition:all 0.15s;");
            btn.textContent = r.label;
            const updateReasonBtns = () => {
                for (const rb of reasonBtns) {
                    rb.btn.style.background = rb.key === selectedReason ? th.accent : "transparent";
                    rb.btn.style.color = rb.key === selectedReason ? "#fff" : th.fgMuted;
                    rb.btn.style.borderColor = rb.key === selectedReason ? th.accent : th.border;
                }
            };
            btn.onclick = () => { selectedReason = r.key; updateReasonBtns(); };
            reasonBtns.push({ btn, key: r.key });
            reasonRow.appendChild(btn);
        }
        modal.appendChild(reasonRow);
        // Init reason button styles
        setTimeout(() => { for (const rb of reasonBtns) { rb.btn.style.background = rb.key === selectedReason ? th.accent : "transparent"; rb.btn.style.color = rb.key === selectedReason ? "#fff" : th.fgMuted; rb.btn.style.borderColor = rb.key === selectedReason ? th.accent : th.border; } }, 0);

        // Day grid
        const dayGrid = this.el("div", "display:flex;flex-direction:column;gap:6px;");
        const shiftLabelPrefix = this.language === "hu" ? "M" : "S";

        for (const day of allDays) {
            const dateStr = day.dateStr;
            const dRow = this.el("div",
                "display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:6px;" +
                "background:" + th.bg + ";border:1px solid " + th.border + ";");

            // Day label
            const dLbl = this.el("div", "font-size:11px;font-weight:600;color:" + th.fg + ";min-width:60px;");
            dLbl.textContent = day.dayLabel;
            if (day.isToday) {
                const tb = this.el("span", "font-size:8px;font-weight:600;padding:0px 4px;border-radius:3px;background:" + th.accent + ";color:#fff;margin-left:4px;");
                tb.textContent = this.language === "hu" ? "MA" : "TODAY";
                dLbl.appendChild(tb);
            }
            dRow.appendChild(dLbl);

            // All-day toggle
            const existing = machine.downtime[dateStr] || {};
            const allDayBtn = this.el("button",
                "padding:2px 6px;font-size:8px;font-weight:600;border-radius:3px;cursor:pointer;transition:all 0.15s;" +
                "border:1px solid " + th.border + ";min-width:52px;");
            allDayBtn.textContent = this.t("allShifts");
            const isAllDay = existing.allDay === true;
            allDayBtn.style.background = isAllDay ? (th.red || "#ff7b72") : "transparent";
            allDayBtn.style.color = isAllDay ? "#fff" : th.fgMuted;
            allDayBtn.style.borderColor = isAllDay ? (th.red || "#ff7b72") : th.border;

            // Per-shift buttons
            const shiftBtns = [];
            for (let si = 0; si < shiftCount; si++) {
                const isOff = existing.allDay || (existing.shifts && existing.shifts.includes(si));
                const sBtn = this.el("button",
                    "padding:2px 6px;font-size:9px;font-weight:600;border-radius:3px;cursor:pointer;transition:all 0.15s;" +
                    "border:1px solid " + th.border + ";min-width:28px;");
                sBtn.textContent = shiftLabelPrefix + (si + 1);
                sBtn.style.background = isOff ? (th.red || "#ff7b72") : "transparent";
                sBtn.style.color = isOff ? "#fff" : th.fgMuted;
                sBtn.style.borderColor = isOff ? (th.red || "#ff7b72") : th.border;

                sBtn.onclick = () => {
                    if (!machine.downtime[dateStr]) machine.downtime[dateStr] = { shifts: [], reason: selectedReason };
                    const dt = machine.downtime[dateStr];
                    dt.allDay = false;
                    if (!dt.shifts) dt.shifts = [];
                    const idx2 = dt.shifts.indexOf(si);
                    if (idx2 >= 0) { dt.shifts.splice(idx2, 1); }
                    else { dt.shifts.push(si); dt.reason = selectedReason; }
                    // Clean up empty entries
                    if (dt.shifts.length === 0 && !dt.allDay) delete machine.downtime[dateStr];
                    // If all shifts selected, mark allDay
                    if (dt.shifts && dt.shifts.length >= shiftCount) { dt.allDay = true; dt.shifts = []; dt.reason = selectedReason; }
                    this._refreshDowntimeModal(machine, dateStr, shiftCount, shiftBtns, allDayBtn, th);
                };
                shiftBtns.push({ btn: sBtn, si: si });
                dRow.appendChild(sBtn);
            }

            allDayBtn.onclick = () => {
                const dt = machine.downtime[dateStr];
                if (dt && dt.allDay) {
                    delete machine.downtime[dateStr];
                } else {
                    machine.downtime[dateStr] = { allDay: true, shifts: [], reason: selectedReason };
                }
                this._refreshDowntimeModal(machine, dateStr, shiftCount, shiftBtns, allDayBtn, th);
            };
            dRow.appendChild(allDayBtn);

            dayGrid.appendChild(dRow);
        }
        modal.appendChild(dayGrid);

        // Save / Cancel buttons
        const btnRow = this.el("div", "display:flex;gap:8px;justify-content:flex-end;margin-top:16px;");
        const cancelBtn = this.el("button",
            "padding:6px 16px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:600;" +
            "border:1px solid " + th.border + ";background:transparent;color:" + th.fgMuted + ";");
        cancelBtn.textContent = this.t("cancel");
        cancelBtn.onclick = () => this.closeModal();
        btnRow.appendChild(cancelBtn);

        const saveBtn = this.el("button",
            "padding:6px 16px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:600;border:none;" +
            "background:" + th.accent + ";color:#fff;");
        saveBtn.textContent = this.t("save");
        saveBtn.onclick = () => {
            this.closeModal();
            this.saveState();
            this.render();
        };
        btnRow.appendChild(saveBtn);
        modal.appendChild(btnRow);

        overlay.appendChild(modal);
        this.target.appendChild(overlay);
        this.modalOverlay = overlay;
    }

    _refreshDowntimeModal(machine, dateStr, shiftCount, shiftBtns, allDayBtn, th) {
        const dt = machine.downtime[dateStr] || {};
        const isAllDay = dt.allDay === true;
        allDayBtn.style.background = isAllDay ? (th.red || "#ff7b72") : "transparent";
        allDayBtn.style.color = isAllDay ? "#fff" : th.fgMuted;
        allDayBtn.style.borderColor = isAllDay ? (th.red || "#ff7b72") : th.border;
        for (const sb of shiftBtns) {
            const isOff = isAllDay || (dt.shifts && dt.shifts.includes(sb.si));
            sb.btn.style.background = isOff ? (th.red || "#ff7b72") : "transparent";
            sb.btn.style.color = isOff ? "#fff" : th.fgMuted;
            sb.btn.style.borderColor = isOff ? (th.red || "#ff7b72") : th.border;
        }
    }

    buildShiftSchedule(area, th) {
        const ss = area.shiftSettings;
        const shiftMin = this.getShiftMinutes(area);
        const totalStop = this.getTotalPlannedStop(area);
        const sc = ss.shiftCount;

        const card = this.el("div",
            "background:" + th.surface + ";border:1px solid " + th.border +
            ";border-radius:10px;box-shadow:" + th.shadow + ";overflow:hidden;");

        // v3.7.19: per-area collapse state. Previously a single global
        // this.shiftSectionCollapsed applied to every area; now each area has
        // its own state (persisted in areaData JSON via saveState). Falls back
        // to the global flag for areas configured before v3.7.19.
        const isCollapsed = (typeof area.shiftSectionCollapsed === "boolean")
            ? area.shiftSectionCollapsed
            : this.shiftSectionCollapsed;

        // Collapsible header — v3.7.19: now visually unambiguous as a click
        // target: accent-colored chevron, explicit "Collapse/Expand" text on
        // the right, and a base-open-time summary always visible (was only
        // shown when collapsed). Hover lifts the background.
        const headerRow = this.el("div",
            "display:flex;align-items:center;gap:8px;padding:12px 16px;cursor:pointer;user-select:none;" +
            "transition:background 0.15s;");
        headerRow.onmouseover = () => { headerRow.style.background = th.surfaceHover; };
        headerRow.onmouseout = () => { headerRow.style.background = "transparent"; };

        const chevron = this.el("span",
            "display:flex;align-items:center;color:" + th.accent + ";transition:transform 0.2s;");
        this.setSVG(chevron, isCollapsed ? ICON_CHEVRON_RIGHT : ICON_CHEVRON_DOWN);
        headerRow.appendChild(chevron);

        const sectionTitle = this.el("span",
            "font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:" + th.fgMuted + ";");
        sectionTitle.textContent = this.t("shiftAndStops");
        headerRow.appendChild(sectionTitle);

        // Always-visible base open time summary so the panel still conveys
        // its essential output when collapsed.
        const headerOpenTime = Math.max(0, (shiftMin - totalStop) * sc);
        const compactInfo = this.el("span",
            "font-size:11px;color:" + th.green + ";font-weight:600;margin-left:auto;");
        compactInfo.textContent = this.t("baseOpenTime") + ": " + headerOpenTime + " " + this.t("min");
        headerRow.appendChild(compactInfo);

        // Explicit collapse/expand action hint on the far right.
        const actionHint = this.el("span",
            "font-size:10px;font-weight:600;color:" + th.accent +
            ";padding:2px 8px;border:1px solid " + th.accent + "55;border-radius:10px;" +
            "background:" + th.accentSoft + ";letter-spacing:0.3px;");
        actionHint.textContent = isCollapsed ? ("▸ " + this.t("expand")) : ("▾ " + this.t("collapse"));
        headerRow.appendChild(actionHint);

        headerRow.onclick = () => {
            area.shiftSectionCollapsed = !isCollapsed;
            this.saveState();
            this.render();
        };
        card.appendChild(headerRow);

        // Content (hidden when collapsed)
        if (isCollapsed) {
            return card;
        }

        const contentWrap = this.el("div", "padding:0 16px 16px 16px;");

        // Three-column layout: shift schedule | planned stops | summary
        const grid = this.el("div",
            "display:flex;gap:20px;flex-wrap:wrap;");

        // --- Column 1: Shift Schedule ---
        const col1 = this.el("div", "display:flex;flex-direction:column;gap:8px;min-width:200px;flex:1;");

        const lbl1 = this.el("label",
            "font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:" + th.fgMuted + ";");
        lbl1.textContent = this.t("shiftSchedule");
        col1.appendChild(lbl1);

        // Shift template select
        const shiftSelect = document.createElement("select");
        if (!this.canEdit()) shiftSelect.disabled = true;  // v3.7.45: read-only for viewers
        shiftSelect.style.cssText = "padding:6px 8px;border:1px solid " + th.border +
            ";border-radius:6px;background:" + th.bg + ";color:" + th.fg +
            ";font-size:12px;cursor:pointer;outline:none;transition:border-color 0.15s;";
        SHIFT_TEMPLATES.forEach((tmpl, idx) => {
            const opt = document.createElement("option");
            opt.value = idx;
            opt.textContent = this.shiftLabel(tmpl);
            if (idx === ss.selectedShiftIdx) opt.selected = true;
            shiftSelect.appendChild(opt);
        });
        shiftSelect.onfocus = () => { shiftSelect.style.borderColor = th.accent; };
        shiftSelect.onblur = () => { shiftSelect.style.borderColor = th.border; };
        shiftSelect.onchange = () => {
            ss.selectedShiftIdx = +shiftSelect.value;
            // Auto-set shift count from template
            const tmpl = SHIFT_TEMPLATES[ss.selectedShiftIdx];
            if (tmpl && tmpl.shifts > 0) {
                ss.shiftCount = tmpl.shifts;
            }
            this.saveState();
            this.render();
        };
        col1.appendChild(shiftSelect);

        // Custom minutes input (only for "Egyedi")
        if (ss.selectedShiftIdx === SHIFT_TEMPLATES.length - 1) {
            const customRow = this.el("div", "display:flex;align-items:center;gap:6px;");
            const customInput = document.createElement("input");
            if (!this.canEdit()) customInput.disabled = true;
            customInput.type = "number";
            customInput.min = "0";
            customInput.max = "1440";
            customInput.value = ss.customShiftMinutes;
            customInput.style.cssText = "width:70px;padding:5px 8px;border:1px solid " + th.border +
                ";border-radius:6px;background:" + th.bg + ";color:" + th.fg +
                ";font-size:12px;text-align:right;outline:none;";
            customInput.onfocus = () => { customInput.style.borderColor = th.accent; };
            customInput.onblur = () => { customInput.style.borderColor = th.border; };
            customInput.onchange = () => {
                ss.customShiftMinutes = Math.max(0, Math.min(1440, +customInput.value || 0));
                this.saveState();
                this.render();
            };
            customRow.appendChild(customInput);
            const minLabel = this.el("span", "font-size:11px;color:" + th.fgMuted + ";");
            minLabel.textContent = this.t("min");
            customRow.appendChild(minLabel);
            col1.appendChild(customRow);
        }

        // Shift count
        const scRow = this.el("div", "display:flex;align-items:center;gap:6px;margin-top:4px;");
        const scLabel = this.el("span", "font-size:12px;color:" + th.fg + ";");
        scLabel.textContent = this.t("shiftCount") + ":";
        scRow.appendChild(scLabel);
        const scInput = document.createElement("input");
        if (!this.canEdit()) scInput.disabled = true;
        scInput.type = "number";
        scInput.min = "1";
        scInput.max = "4";
        scInput.value = sc;
        scInput.style.cssText = "width:50px;padding:4px 6px;border:1px solid " + th.border +
            ";border-radius:6px;background:" + th.bg + ";color:" + th.fg +
            ";font-size:12px;text-align:center;outline:none;";
        scInput.onfocus = () => { scInput.style.borderColor = th.accent; };
        scInput.onblur = () => { scInput.style.borderColor = th.border; };
        scInput.onchange = () => {
            ss.shiftCount = Math.max(1, Math.min(4, +scInput.value || 1));
            this.saveState();
            this.render();
        };
        scRow.appendChild(scInput);
        col1.appendChild(scRow);

        // Shift offset (pipeline offset in shifts)
        const soRow = this.el("div", "display:flex;align-items:center;gap:6px;margin-top:4px;");
        const soLabel = this.el("span", "font-size:12px;color:" + th.fg + ";");
        soLabel.textContent = this.t("shiftOffset") + ":";
        soRow.appendChild(soLabel);
        const soInput = document.createElement("input");
        if (!this.canEdit()) soInput.disabled = true;
        soInput.type = "number";
        soInput.min = "0";
        soInput.max = "20";
        soInput.value = ss.shiftOffset || 0;
        soInput.style.cssText = "width:50px;padding:4px 6px;border:1px solid " + th.border +
            ";border-radius:6px;background:" + th.bg + ";color:" + th.fg +
            ";font-size:12px;text-align:center;outline:none;";
        soInput.onfocus = () => { soInput.style.borderColor = th.accent; };
        soInput.onblur = () => { soInput.style.borderColor = th.border; };
        soInput.onchange = () => {
            ss.shiftOffset = Math.max(0, Math.min(20, +soInput.value || 0));
            this.saveState();
            this.render();
        };
        soRow.appendChild(soInput);
        const soUnit = this.el("span", "font-size:11px;color:" + th.fgMuted + ";");
        soUnit.textContent = this.t("shiftsAhead");
        soRow.appendChild(soUnit);
        col1.appendChild(soRow);

        // Shift info
        const shiftInfo = this.el("div", "font-size:11px;color:" + th.fgMuted + ";margin-top:4px;");
        shiftInfo.textContent = this.t("shift") + ": " + shiftMin + " × " + sc + " = " + (shiftMin * sc) + " " + this.t("min");
        col1.appendChild(shiftInfo);

        // v3.7.15 / v3.7.17: Consolidation threshold (aggressiveness slider).
        // Drives both _consolidateMultiProductFragments and
        // _consolidateSinglesIntoExistingMachine post-process passes.
        // 100 = always try to consolidate (subject to target capacity check).
        // Lower values only move genuinely small fragments. 0 = off.
        // Persisted per-area in areaData JSON.
        const consRow = this.el("div", "display:flex;align-items:center;gap:6px;margin-top:8px;");
        const consLabel = this.el("span", "font-size:12px;color:" + th.fg + ";");
        consLabel.textContent = this.t("consolidationThreshold") + ":";
        consRow.appendChild(consLabel);
        const consInput = document.createElement("input");
        if (!this.canEdit()) consInput.disabled = true;
        consInput.type = "number";
        consInput.min = "0";
        consInput.max = "100";
        consInput.value = (area.consolidationThresholdPct != null) ? area.consolidationThresholdPct : 100;
        consInput.style.cssText = "width:55px;padding:4px 6px;border:1px solid " + th.border +
            ";border-radius:6px;background:" + th.bg + ";color:" + th.fg +
            ";font-size:12px;text-align:center;outline:none;";
        consInput.onfocus = () => { consInput.style.borderColor = th.accent; };
        consInput.onblur = () => { consInput.style.borderColor = th.border; };
        consInput.onchange = () => {
            area.consolidationThresholdPct = Math.max(0, Math.min(100, +consInput.value || 0));
            this.saveState();
            this.render();
        };
        consRow.appendChild(consInput);
        const consUnit = this.el("span", "font-size:11px;color:" + th.fgMuted + ";");
        consUnit.textContent = "%";
        consRow.appendChild(consUnit);
        col1.appendChild(consRow);
        const consHint = this.el("div", "font-size:10px;color:" + th.fgMuted + ";margin-top:2px;line-height:1.35;max-width:240px;");
        consHint.textContent = this.t("consolidationThresholdHint");
        col1.appendChild(consHint);

        grid.appendChild(col1);

        // --- Column 2: Planned Stops ---
        const col2 = this.el("div", "display:flex;flex-direction:column;gap:8px;min-width:220px;flex:1;");

        const lbl2 = this.el("label",
            "font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:" + th.fgMuted + ";");
        lbl2.textContent = this.t("plannedStops");
        col2.appendChild(lbl2);

        const stopGrid = this.el("div", "display:grid;grid-template-columns:1fr auto;gap:4px 8px;align-items:center;");
        PLANNED_STOPS.forEach((stop, idx) => {
            const sLabel = this.el("span", "font-size:12px;color:" + th.fg + ";");
            sLabel.textContent = this.stopLabel(stop);
            stopGrid.appendChild(sLabel);

            const inputWrap = this.el("div", "display:flex;align-items:center;gap:4px;");
            const sInput = document.createElement("input");
            if (!this.canEdit()) sInput.disabled = true;
            sInput.type = "number";
            sInput.min = "0";
            sInput.max = "999";
            sInput.value = ss.plannedStopMinutes[idx];
            sInput.style.cssText = "width:55px;padding:4px 6px;border:1px solid " + th.border +
                ";border-radius:6px;background:" + th.bg + ";color:" + th.fg +
                ";font-size:12px;text-align:right;outline:none;transition:border-color 0.15s;";
            sInput.onfocus = () => { sInput.style.borderColor = th.accent; };
            sInput.onblur = () => { sInput.style.borderColor = th.border; };
            sInput.onchange = () => {
                ss.plannedStopMinutes[idx] = Math.max(0, +sInput.value || 0);
                this.saveState();
                this.render();
            };
            inputWrap.appendChild(sInput);
            const pLabel = this.el("span", "font-size:10px;color:" + th.fgMuted + ";");
            pLabel.textContent = this.t("min");
            inputWrap.appendChild(pLabel);
            stopGrid.appendChild(inputWrap);
        });
        col2.appendChild(stopGrid);

        const totalInfo = this.el("div", "font-size:11px;color:" + th.green + ";font-weight:600;margin-top:4px;");
        totalInfo.textContent = this.t("totalPlannedStop") + ": " + totalStop + " " + this.t("min");
        col2.appendChild(totalInfo);
        grid.appendChild(col2);

        // --- Column 3: Summary ---
        const col3 = this.el("div", "display:flex;flex-direction:column;gap:8px;min-width:180px;flex:1;");

        const lbl3 = this.el("label",
            "font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:" + th.fgMuted + ";");
        lbl3.textContent = this.t("summary");
        col3.appendChild(lbl3);

        const totalShiftMin = shiftMin * sc;
        const totalStopMin = totalStop * sc;
        const openTime = Math.max(0, (shiftMin - totalStop) * sc);

        const summaryItems = [
            { label: this.t("shift"), value: shiftMin + " × " + sc + " = " + totalShiftMin, color: th.accent },
            { label: this.t("plannedStops"), value: totalStop + " × " + sc + " = " + totalStopMin, color: th.amber },
            { label: this.t("baseOpenTime"), value: String(openTime), color: th.green }
        ];

        summaryItems.forEach(item => {
            const row = this.el("div", "font-size:12px;color:" + th.fg + ";");
            this.clearNode(row);
            row.appendChild(document.createTextNode(item.label + ": "));
            { const _bold = document.createElement("b"); _bold.style.color = item.color; _bold.appendChild(document.createTextNode(String(item.value))); row.appendChild(_bold); }
            row.appendChild(document.createTextNode(" " + this.t("min")));
            col3.appendChild(row);
        });

        // Visual bar
        if (totalShiftMin > 0) {
            const barWrap = this.el("div", "margin-top:8px;");
            const barBg = this.el("div",
                "height:20px;border-radius:6px;background:" + th.bg + ";overflow:hidden;display:flex;border:1px solid " + th.border + ";");
            const openPct = (openTime / totalShiftMin) * 100;
            const stopPct = (totalStopMin / totalShiftMin) * 100;
            const openBar = this.el("div",
                "height:100%;background:" + th.green + ";width:" + openPct + "%;transition:width 0.3s;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;color:#fff;overflow:hidden;");
            if (openPct > 15) openBar.textContent = openTime + " " + this.t("min");
            barBg.appendChild(openBar);
            const stopBar = this.el("div",
                "height:100%;background:" + th.amber + ";width:" + stopPct + "%;transition:width 0.3s;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;color:#fff;overflow:hidden;");
            if (stopPct > 15) stopBar.textContent = totalStopMin + " " + this.t("min");
            barBg.appendChild(stopBar);
            barWrap.appendChild(barBg);

            // Legend
            const legend = this.el("div", "display:flex;gap:12px;margin-top:4px;");
            [{ color: th.green, label: this.t("baseOpenTime") }, { color: th.amber, label: this.t("plannedStops") }].forEach(l => {
                const item = this.el("div", "display:flex;align-items:center;gap:4px;font-size:10px;color:" + th.fgMuted + ";");
                const d = this.el("span", "width:8px;height:8px;border-radius:2px;background:" + l.color + ";");
                item.appendChild(d);
                item.appendChild(document.createTextNode(l.label));
                legend.appendChild(item);
            });
            barWrap.appendChild(legend);
            col3.appendChild(barWrap);
        }

        grid.appendChild(col3);
        contentWrap.appendChild(grid);
        card.appendChild(contentWrap);
        return card;
    }

    // ====== PRODUCT CLASSIFICATION & BOM HELPERS ======

    // Returns true when the product is a final/finished product
    // Priority: explicit productType binding → has real goals or deliveries (heuristic)
    _isFinishedProduct(name) {
        if (!name) return false;
        const t = this.productTypeMap && this.productTypeMap[name];
        if (t) {
            const tt = String(t).toLowerCase();
            if (tt === "finished" || tt === "final" || tt === "végtermék" || tt === "finished goods" || tt === "végtermek") return true;
            if (tt === "component" || tt === "komponens" || tt === "raw" || tt === "sub") return false;
        }
        // Heuristic fallback: treat as finished if it has goals or deliveries in the data
        const pg = this.productGoals[name];
        if (pg) {
            // CRITICAL: virtual goals (injected for components via BOM pull) do NOT make a product finished
            if (pg._virtual) return false;
            if (pg.goalByWeek && Object.keys(pg.goalByWeek).length > 0) {
                for (const k in pg.goalByWeek) {
                    if ((pg.goalByWeek[k] || 0) > 0) return true;
                }
            }
            if (Array.isArray(pg.deliveries) && pg.deliveries.some(d => (d.qty || 0) > 0)) return true;
        }
        return false;
    }

    _isComponentProduct(name) {
        if (!name) return false;
        const t = this.productTypeMap && this.productTypeMap[name];
        if (t) {
            const tt = String(t).toLowerCase();
            if (tt === "component" || tt === "komponens" || tt === "raw" || tt === "sub") return true;
        }
        // Heuristic: if we have this product in dataProducts but it has no goals and no deliveries → component
        const pg = this.productGoals[name];
        if (pg) {
            const hasGoal = pg.goalByWeek && Object.values(pg.goalByWeek).some(v => (v || 0) > 0);
            const hasDel = Array.isArray(pg.deliveries) && pg.deliveries.some(d => (d.qty || 0) > 0);
            if (hasGoal || hasDel) return false;
        }
        // If not explicitly finished, treat as component (so planning kicks in)
        return !this._isFinishedProduct(name);
    }

    // Returns list of final product names from dataProducts
    _getFinishedProductNames() {
        return (this.dataProducts || []).map(p => p.name).filter(n => this._isFinishedProduct(n));
    }

    // Compute virtual component goals based on BOM (if available) or a safe heuristic
    // Returns: { componentName: { goalThisWeek, goalNextWeek, prevWeekGoal } }
    _getVirtualComponentGoals() {
        const result = {};
        const bom = this.bomMap || {};
        const bomKeys = Object.keys(bom);
        const hasExplicitBOM = bomKeys.length > 0;

        // Collect finished product goals per week
        const finishedNames = this._getFinishedProductNames();
        if (finishedNames.length === 0) return result;

        // Collect all component names from dataProducts
        const componentNames = (this.dataProducts || [])
            .map(p => p.name)
            .filter(n => this._isComponentProduct(n));
        if (componentNames.length === 0) return result;

        for (const comp of componentNames) {
            let gThis = 0, gNext = 0, gPrev = 0;
            if (hasExplicitBOM) {
                // Precise: sum parentGoal × qtyPer for every parent that lists this component
                for (const parent of bomKeys) {
                    const qp = bom[parent][comp] || 0;
                    if (qp <= 0) continue;
                    const pg = this.getGoals(parent);
                    gThis += (pg.goalThisWeek || 0) * qp;
                    gNext += (pg.goalNextWeek || 0) * qp;
                    gPrev += (pg.prevWeekGoal || 0) * qp;
                }
            } else {
                // Heuristic: every finished product uses 1 of this component
                for (const parent of finishedNames) {
                    const pg = this.getGoals(parent);
                    gThis += (pg.goalThisWeek || 0);
                    gNext += (pg.goalNextWeek || 0);
                    gPrev += (pg.prevWeekGoal || 0);
                }
            }
            result[comp] = { goalThisWeek: gThis, goalNextWeek: gNext, prevWeekGoal: gPrev };
        }
        return result;
    }

    // ====== LOGISTICS PAGE ======
    getGoals(productName) {
        const pg = this.productGoals[productName];
        const empty = { goalThisWeek: 0, goalNextWeek: 0, prevWeekGoal: 0, deliveries: [] };
        if (!pg) return empty;
        const prevWeekNum = this.currentWeekNum <= 1 ? 52 : this.currentWeekNum - 1;
        // Normalize deliveries: support old single delivery + new array
        let deliveries = [];
        if (Array.isArray(pg.deliveries)) {
            deliveries = pg.deliveries.map(d => ({ qty: d.qty || 0, date: d.date || "" }));
        } else if (pg.deliveryQty > 0) {
            deliveries = [{ qty: pg.deliveryQty, date: pg.deliveryDate || "" }];
        }
        // Sort by date (earliest first)
        deliveries.sort((a, b) => (a.date || "9999") < (b.date || "9999") ? -1 : 1);
        // Filter deliveries to CURRENT WEEK ONLY (+ no-date entries)
        // Use 7-day weeks so weekend delivery dates are also valid
        const _validDates = new Set(this._getPlanWorkdays(7).filter(d => d.week === this.currentWeekNum).map(d => d.dateStr));
        deliveries = deliveries.filter(d => !d.date || _validDates.has(d.date));
        if (pg.goalByWeek) {
            return {
                goalThisWeek: pg.goalByWeek[String(this.currentWeekNum)] || 0,
                goalNextWeek: pg.goalByWeek[String(this.nextWeekNum)] || 0,
                prevWeekGoal: pg.goalByWeek[String(prevWeekNum)] || 0,
                deliveries: deliveries
            };
        }
        return {
            goalThisWeek: pg.goalThisWeek || 0,
            goalNextWeek: pg.goalNextWeek || 0,
            prevWeekGoal: 0,
            deliveries: deliveries
        };
    }

    // v3.7.45: per-product schedule timeline (Gantt-like) for a selected area.
    // Rows = products, columns = shift slots (this week + next week, non-past),
    // each filled cell is a coloured block with the planned quantity.
    buildGanttPage(th) {
        const wrap = this.el("div", "");
        const titleEl = this.el("div", "font-size:18px;font-weight:600;color:" + th.fg + ";margin-bottom:4px;");
        titleEl.textContent = this.t("ganttView");
        wrap.appendChild(titleEl);
        const sub = this.el("div", "font-size:12px;color:" + th.fgMuted + ";margin-bottom:14px;");
        sub.textContent = this.t("ganttSub");
        wrap.appendChild(sub);

        const noPlanBox = () => {
            const e = this.el("div", "color:" + th.fgMuted + ";padding:20px;font-size:13px;");
            e.textContent = this.t("noPlan");
            return e;
        };

        // Selectable areas = ALL plannable areas (any area with machines: production and
        // quality-with-machines, incl. parallel branches). Buffers have no plan → excluded.
        // Ordered topologically (feeders first, final assembly last) to match the build
        // flow and the pipeline view — via _getOrderedAreas().
        const areas = this._getOrderedAreas().filter(a => a && a.type !== "buffer" && (a.machines || []).length > 0);
        if (areas.length === 0) { wrap.appendChild(noPlanBox()); return wrap; }
        if (!this._ganttAreaId || !areas.find(a => a.id === this._ganttAreaId)) {
            this._ganttAreaId = areas[0].id;
        }

        // Area selector pills.
        const pillRow = this.el("div", "display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;");
        areas.forEach(a => {
            const selp = a.id === this._ganttAreaId;
            const pill = this.el("button",
                "padding:5px 12px;border-radius:14px;cursor:pointer;font-size:12px;outline:none;transition:all .15s;" +
                "font-weight:" + (selp ? "600" : "400") + ";border:1px solid " + (selp ? th.purple : th.border) +
                ";background:" + (selp ? th.purpleSoft : "transparent") + ";color:" + (selp ? th.purple : th.fgMuted) + ";");
            pill.textContent = a.customName || a.name || a.id;
            pill.onmouseover = () => { if (!selp) pill.style.borderColor = th.purple; };
            pill.onmouseout = () => { if (!selp) pill.style.borderColor = th.border; };
            pill.onclick = () => { this._ganttAreaId = a.id; this.render(); };
            pillRow.appendChild(pill);
        });
        wrap.appendChild(pillRow);

        const area = areas.find(a => a.id === this._ganttAreaId);
        const plan = this._calculateAreaPlan(area);
        const slots = (plan && plan.dailyPlan) ? plan.dailyPlan.filter(s => !s.isPast) : [];
        if (slots.length === 0) { wrap.appendChild(noPlanBox()); return wrap; }

        // Aggregate quantity per product per slot.
        const order = [];
        const qty = {};     // product -> number[]  (per slot)
        const buck = {};    // product -> string[]  (per slot, first bucket seen)
        slots.forEach((slot, si) => {
            for (const m of (slot.machines || [])) {
                const prods = (m.products && m.products.length) ? m.products
                    : [{ productName: m.productName, qty: m.qty, bucket: m.bucket }];
                for (const pp of prods) {
                    if (!pp || !pp.qty || pp.qty <= 0 || !pp.productName || pp.productName === "-") continue;
                    const pn = pp.productName;
                    if (!qty[pn]) { qty[pn] = new Array(slots.length).fill(0); buck[pn] = new Array(slots.length).fill(""); order.push(pn); }
                    qty[pn][si] += pp.qty;
                    if (!buck[pn][si]) buck[pn][si] = pp.bucket || "";
                }
            }
        });
        if (order.length === 0) { wrap.appendChild(noPlanBox()); return wrap; }
        const totalOf = pn => qty[pn].reduce((x, y) => x + y, 0);
        order.sort((a, b) => totalOf(b) - totalOf(a));

        const bucketLabel = {
            curDelivery: this.t("curWeekDelivery"), curGoal: this.t("curWeekGoal"),
            nxtDelivery: this.t("nxtWeekDelivery"), nxtGoal: this.t("nxtWeekGoal")
        };
        const textOn = (hex) => {
            const h = String(hex || "#888888").replace("#", "");
            if (h.length < 6) return "#fff";
            const r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
            return (r * 299 + g * 587 + b * 114) / 1000 >= 150 ? "#000" : "#fff";
        };

        const NAMECOL = 160;
        const grid = this.el("div",
            "display:grid;grid-template-columns:" + NAMECOL + "px repeat(" + slots.length + ", minmax(46px, 1fr));" +
            "gap:2px;min-width:max-content;align-items:stretch;");

        // Header row 1 — day labels spanning their shifts.
        const corner = this.el("div", "position:sticky;left:0;z-index:2;background:" + th.bg + ";");
        grid.appendChild(corner);
        let i = 0;
        while (i < slots.length) {
            let j = i;
            while (j < slots.length && slots[j].dayLabel === slots[i].dayLabel) j++;
            const span = j - i;
            const isNext = slots[i].week === this.nextWeekNum;
            const dayCell = this.el("div",
                "grid-column:span " + span + ";text-align:center;font-size:11px;font-weight:600;padding:4px 2px;border-radius:5px;" +
                "color:" + (isNext ? th.purple : th.fg) + ";background:" + (isNext ? th.purpleSoft : th.surface) + ";");
            dayCell.textContent = slots[i].dayLabel;
            grid.appendChild(dayCell);
            i = j;
        }

        // Header row 2 — shift labels.
        const corner2 = this.el("div", "position:sticky;left:0;z-index:2;background:" + th.bg + ";");
        grid.appendChild(corner2);
        slots.forEach(slot => {
            const sc = this.el("div", "text-align:center;font-size:9px;color:" + th.fgMuted + ";padding:2px 0;");
            sc.textContent = slot.shiftLabel || "";
            grid.appendChild(sc);
        });

        // Product rows.
        order.forEach(pn => {
            const color = (this._getProductColor && this._getProductColor(pn)) || th.accent;
            const nameCell = this.el("div",
                "position:sticky;left:0;z-index:1;display:flex;align-items:center;gap:6px;padding:4px 8px;" +
                "background:" + th.surface + ";border-radius:5px;overflow:hidden;");
            const dot = this.el("span", "width:9px;height:9px;border-radius:2px;flex:none;background:" + color + ";");
            nameCell.appendChild(dot);
            const nm = this.el("span", "font-size:11px;color:" + th.fg + ";white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;");
            nm.textContent = pn;
            nameCell.appendChild(nm);
            const tot = this.el("span", "font-size:10px;font-weight:600;color:" + th.fgMuted + ";flex:none;");
            tot.textContent = String(totalOf(pn));
            nameCell.appendChild(tot);
            grid.appendChild(nameCell);

            qty[pn].forEach((q, si) => {
                if (q > 0) {
                    const cell = this.el("div",
                        "display:flex;align-items:center;justify-content:center;border-radius:4px;min-height:24px;" +
                        "font-size:10px;font-weight:600;background:" + color + ";color:" + textOn(color) + ";");
                    cell.textContent = String(q);
                    const bl = buck[pn][si] ? (bucketLabel[buck[pn][si]] || buck[pn][si]) : "";
                    cell.title = pn + " — " + slots[si].dayLabel + " " + (slots[si].shiftLabel || "") + ": " + q + (bl ? " (" + bl + ")" : "");
                    grid.appendChild(cell);
                } else {
                    grid.appendChild(this.el("div", "min-height:24px;border-radius:4px;background:" + th.surfaceHover + ";opacity:0.4;"));
                }
            });
        });

        const scroller = this.el("div", "overflow-x:auto;padding-bottom:8px;");
        scroller.appendChild(grid);
        wrap.appendChild(scroller);

        // Week legend.
        const legend = this.el("div", "display:flex;gap:18px;margin-top:12px;font-size:11px;");
        const lg1 = this.el("span", "color:" + th.fg + ";"); lg1.textContent = "▮ " + this.t("thisWeekView");
        const lg2 = this.el("span", "color:" + th.purple + ";"); lg2.textContent = "▮ " + this.t("nextWeekView");
        legend.appendChild(lg1); legend.appendChild(lg2);
        wrap.appendChild(legend);

        return wrap;
    }

    buildLogisticsPage(th) {
        const wrap = this.el("div", "display:flex;flex-direction:column;gap:16px;");

        // Header row: title + week settings
        const hdr = this.el("div", "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;");
        const title = this.el("span", "font-size:18px;font-weight:600;color:" + th.fg + ";");
        title.textContent = this.t("logistics");
        hdr.appendChild(title);

        // Week number settings
        const weekRow = this.el("div", "display:flex;align-items:center;gap:12px;");

        // Current week
        const cwRow = this.el("div", "display:flex;align-items:center;gap:4px;");
        const cwLabel = this.el("span", "font-size:11px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;");
        cwLabel.textContent = this.t("currentWeek") + ":";
        cwRow.appendChild(cwLabel);
        const cwInput = document.createElement("input");
        cwInput.type = "number"; cwInput.min = "1"; cwInput.max = "53";
        cwInput.value = this.currentWeekNum;
        cwInput.style.cssText = "width:50px;padding:4px 6px;border:1px solid " + th.border +
            ";border-radius:6px;background:" + th.bg + ";color:" + th.fg + ";font-size:12px;text-align:center;outline:none;";
        cwInput.onfocus = () => { cwInput.style.borderColor = th.accent; };
        cwInput.onblur = () => { cwInput.style.borderColor = th.border; };
        cwInput.onchange = () => {
            this.currentWeekNum = Math.max(1, Math.min(53, +cwInput.value || 1));
            this.nextWeekNum = this.currentWeekNum >= 52 ? 1 : this.currentWeekNum + 1;
            this.saveState(); this.render();
        };
        cwRow.appendChild(cwInput);
        weekRow.appendChild(cwRow);

        // Next week
        const nwRow = this.el("div", "display:flex;align-items:center;gap:4px;");
        const nwLabel = this.el("span", "font-size:11px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;");
        nwLabel.textContent = this.t("nextWeek") + ":";
        nwRow.appendChild(nwLabel);
        const nwInput = document.createElement("input");
        nwInput.type = "number"; nwInput.min = "1"; nwInput.max = "53";
        nwInput.value = this.nextWeekNum;
        nwInput.style.cssText = "width:50px;padding:4px 6px;border:1px solid " + th.border +
            ";border-radius:6px;background:" + th.bg + ";color:" + th.fg + ";font-size:12px;text-align:center;outline:none;";
        nwInput.onfocus = () => { nwInput.style.borderColor = th.accent; };
        nwInput.onblur = () => { nwInput.style.borderColor = th.border; };
        nwInput.onchange = () => {
            this.nextWeekNum = Math.max(1, Math.min(53, +nwInput.value || 1));
            this.saveState(); this.render();
        };
        nwRow.appendChild(nwInput);
        weekRow.appendChild(nwRow);
        hdr.appendChild(weekRow);
        wrap.appendChild(hdr);

        // Empty state - no data connected
        if (this.dataProducts.length === 0) {
            const empty = this.el("div", "display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 0;text-align:center;");
            const icon = this.el("div", "color:" + th.fgMuted + ";opacity:0.25;margin-bottom:16px;");
            this.setSVG(icon, '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>');
            empty.appendChild(icon);
            const t1 = this.el("div", "font-size:15px;font-weight:600;color:" + th.fg + ";margin-bottom:4px;");
            t1.textContent = this.t("noProducts");
            empty.appendChild(t1);
            const t2 = this.el("div", "font-size:12px;color:" + th.fgMuted + ";max-width:300px;line-height:1.4;");
            t2.textContent = this.t("noDataProducts");
            empty.appendChild(t2);
            wrap.appendChild(empty);
            return wrap;
        }

        // Product tiles grid - Finished products only (components are driven by BOM pull)
        // Sorted by remaining (most missing first for prioritization)
        // v3.3.23: only show products that actually have a goal in the current
        // or next week — otherwise products from past rotation cycles inflate the
        // "0 / N" fulfillment denominator and clutter the tile grid.
        const sortedProducts = [...this.dataProducts]
            .filter(p => this._isFinishedProduct(p.name))
            .filter(p => {
                const g = this.getGoals(p.name);
                return ((g.goalThisWeek || 0) > 0) || ((g.goalNextWeek || 0) > 0);
            })
            .sort((a, b) => {
                const gA = this.getGoals(a.name);
                const gB = this.getGoals(b.name);
                const totalA = (gA.goalThisWeek || 0) + (gA.goalNextWeek || 0);
                const totalB = (gB.goalThisWeek || 0) + (gB.goalNextWeek || 0);
                const prevA = gA.prevWeekGoal > 0 ? Math.max(0, (a.producedQtyPrevWeek || 0) - gA.prevWeekGoal) : 0;
                const prevB = gB.prevWeekGoal > 0 ? Math.max(0, (b.producedQtyPrevWeek || 0) - gB.prevWeekGoal) : 0;
                const remA = Math.max(0, totalA - (a.producedQty + prevA + (a.producedQtyNextWeek || 0)));
                const remB = Math.max(0, totalB - (b.producedQty + prevB + (b.producedQtyNextWeek || 0)));
                return remB - remA;
            });

        // Summary tile
        wrap.appendChild(this.buildSummaryTile(sortedProducts, th));

        const grid = this.el("div",
            "display:grid;grid-template-columns:repeat(2,1fr);gap:14px;max-width:1200px;margin:0 auto;");

        sortedProducts.forEach(dp => {
            grid.appendChild(this.buildProductTile(dp, th));
        });

        wrap.appendChild(grid);
        return wrap;
    }

    buildSummaryTile(products, th) {
        let sumGoalThis = 0, sumGoalNext = 0, sumProduced = 0, sumProducedNext = 0, sumOverflow = 0;
        let completedCount = 0;
        products.forEach(dp => {
            const goals = this.getGoals(dp.name);
            const gTW = goals.goalThisWeek || 0;
            const gNW = goals.goalNextWeek || 0;
            const prevGoal = goals.prevWeekGoal || 0;
            const prevOv = prevGoal > 0 ? Math.max(0, (dp.producedQtyPrevWeek || 0) - prevGoal) : 0;
            const prodThis = (dp.producedQty || 0);
            sumGoalThis += gTW;
            sumGoalNext += gNW;
            // Goal progress: this-week production ONLY (overflow does NOT count toward goal)
            sumProduced += prodThis;
            sumProducedNext += (dp.producedQtyNextWeek || 0);
            sumOverflow += prevOv;
            if (gTW > 0 && prodThis >= gTW) completedCount++;
        });
        const totalGoal = sumGoalThis + sumGoalNext;
        const totalProd = sumProduced + sumProducedNext;
        const pct = sumGoalThis > 0 ? Math.min(100, Math.round((sumProduced / sumGoalThis) * 100)) : 0;
        const pctTotal = totalGoal > 0 ? Math.min(100, Math.round((totalProd / totalGoal) * 100)) : 0;

        const card = this.el("div",
            "padding:16px 20px;background:" + th.surface + ";border:1px solid " + th.border +
            ";border-radius:10px;box-shadow:" + th.shadow + ";margin-bottom:4px;max-width:1140px;margin-left:auto;margin-right:auto;");

        // Top row: title
        const titleRow = this.el("div", "display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;");
        const title = this.el("span", "font-size:14px;font-weight:600;color:" + th.fg + ";");
        title.textContent = this.t("summaryTile");
        titleRow.appendChild(title);
        const badge = this.el("span",
            "font-size:11px;font-weight:600;padding:2px 8px;border-radius:10px;" +
            "background:" + (pct >= 100 ? th.greenSoft : th.amberSoft) + ";color:" + (pct >= 100 ? th.green : th.amber) + ";");
        badge.textContent = pct + "% " + this.t("fulfilled");
        titleRow.appendChild(badge);
        card.appendChild(titleRow);

        // Stats row
        const stats = this.el("div", "display:flex;gap:24px;flex-wrap:wrap;align-items:flex-end;");

        // Current week goal + progress bar
        const col1 = this.el("div", "display:flex;flex-direction:column;gap:6px;flex:1;min-width:200px;");
        const cwLabel = this.el("div", "font-size:11px;font-weight:600;text-transform:uppercase;color:" + th.fgMuted + ";");
        cwLabel.textContent = this.t("weekNum") + " " + this.currentWeekNum + " — " + this.t("totalWeekGoal");
        col1.appendChild(cwLabel);
        const cwVal = this.el("div", "font-size:20px;font-weight:700;color:" + th.fg + ";");
        cwVal.textContent = Math.round(sumProduced) + " / " + Math.round(sumGoalThis) + " " + this.t("pcs");
        col1.appendChild(cwVal);
        // Progress bar
        const barBg = this.el("div", "height:8px;border-radius:4px;background:" + th.bg + ";overflow:hidden;border:1px solid " + th.border + ";");
        const barFill = this.el("div", "height:100%;border-radius:4px;background:" + (pct >= 100 ? th.green : th.accent) +
            ";width:" + pct + "%;transition:width 0.3s;");
        barBg.appendChild(barFill);
        col1.appendChild(barBg);
        stats.appendChild(col1);

        // Next week
        if (sumGoalNext > 0) {
            const col2 = this.el("div", "display:flex;flex-direction:column;gap:4px;min-width:120px;");
            const nwLabel = this.el("div", "font-size:11px;font-weight:600;text-transform:uppercase;color:" + th.fgMuted + ";");
            nwLabel.textContent = this.t("weekNum") + " " + this.nextWeekNum;
            col2.appendChild(nwLabel);
            const nwVal = this.el("div", "font-size:16px;font-weight:600;color:" + th.fg + ";");
            nwVal.textContent = Math.round(sumProducedNext) + " / " + Math.round(sumGoalNext) + " " + this.t("pcs");
            col2.appendChild(nwVal);
            stats.appendChild(col2);
        }

        // Completed products count
        const col3 = this.el("div", "display:flex;flex-direction:column;gap:4px;min-width:100px;align-items:center;");
        const cpLabel = this.el("div", "font-size:11px;font-weight:600;text-transform:uppercase;color:" + th.fgMuted + ";");
        cpLabel.textContent = this.t("fulfilled");
        col3.appendChild(cpLabel);
        const cpVal = this.el("div", "font-size:20px;font-weight:700;color:" + (completedCount === products.length && products.length > 0 ? th.green : th.accent) + ";");
        cpVal.textContent = completedCount + " / " + products.length;
        col3.appendChild(cpVal);
        const cpSub = this.el("div", "font-size:10px;color:" + th.fgMuted + ";");
        cpSub.textContent = this.t("products");
        col3.appendChild(cpSub);
        stats.appendChild(col3);

        // Overflow indicator
        if (sumOverflow > 0) {
            const col4 = this.el("div", "display:flex;flex-direction:column;gap:4px;min-width:80px;align-items:center;");
            const ovLabel = this.el("div", "font-size:11px;font-weight:600;text-transform:uppercase;color:" + th.purple + ";");
            ovLabel.textContent = this.t("overflow").split(" ")[0];
            col4.appendChild(ovLabel);
            const ovVal = this.el("div", "font-size:16px;font-weight:700;color:" + th.purple + ";");
            ovVal.textContent = "+" + Math.round(sumOverflow) + " " + this.t("pcs");
            col4.appendChild(ovVal);
            stats.appendChild(col4);
        }

        card.appendChild(stats);
        return card;
    }

    buildProductTile(dp, th) {
        const goals = this.getGoals(dp.name);
        const produced = dp.producedQty || 0;
        const producedNext = dp.producedQtyNextWeek || 0;
        const producedPrev = dp.producedQtyPrevWeek || 0;
        const goalThisWeek = goals.goalThisWeek || 0;
        const goalNextWeek = goals.goalNextWeek || 0;
        const prevWeekGoal = goals.prevWeekGoal || 0;
        const deliveries = goals.deliveries || [];
        const totalGoal = goalThisWeek + goalNextWeek;

        // Automatic overflow from previous week — NOT counted toward this week's GOAL,
        // only used for DELIVERY fulfillment (ready stock that can ship this week).
        const prevWeekOverflow = prevWeekGoal > 0 ? Math.max(0, producedPrev - prevWeekGoal) : 0;
        // Delivery-available stock = this week's production + carried-over overflow
        const effectiveProduced = produced + prevWeekOverflow;

        // GOAL PROGRESS uses this-week production ONLY (no overflow)
        const thisWeekProduced = Math.min(produced, goalThisWeek);
        const overflowFromCurrent = Math.max(0, produced - goalThisWeek);
        const nextWeekProduced = producedNext + overflowFromCurrent;
        const thisWeekRemaining = Math.max(0, goalThisWeek - produced);
        const weekPct = goalThisWeek > 0 ? Math.min(100, Math.round((produced / goalThisWeek) * 100)) : 0;

        const card = this.el("div",
            "padding:16px;background:" + th.surface + ";border:1px solid " + th.border +
            ";border-radius:10px;box-shadow:" + th.shadow + ";transition:all 0.15s;cursor:pointer;" +
            (thisWeekRemaining > 0 && goalThisWeek > 0 ? "border-left:3px solid " + th.amber + ";" : totalGoal > 0 ? "border-left:3px solid " + th.green + ";" : ""));
        card.onmouseover = () => { card.style.boxShadow = th.shadowLg; };
        card.onmouseout = () => { card.style.boxShadow = th.shadow; };

        // v3.7.45: filter-out via selectionManager (AppSource cert 1180.2.2.3)
        // and tooltipService (1180.2.2.2). Click selects this product so other
        // visuals on the page cross-filter; hover shows a Power BI tooltip with
        // product details. canEdit() editors ALSO open the goal modal.
        const _selId = (this.productSelectionIds || {})[dp.name];
        if (this.canEdit()) {
            card.onclick = (ev) => {
                if (_selId && this.selectionManager) {
                    try { this.selectionManager.select(_selId, ev.ctrlKey || ev.metaKey); } catch (_e) {}
                }
                this.showProductGoalModal(dp.name);
            };
        } else if (_selId && this.selectionManager) {
            card.onclick = (ev) => {
                try { this.selectionManager.select(_selId, ev.ctrlKey || ev.metaKey); } catch (_e) {}
            };
        } else {
            card.style.cursor = "default";
        }
        if (this.tooltipService) {
            const _tipItems = [
                { displayName: "Product", value: String(dp.name) },
                { displayName: "Goal (this week)", value: String(goalThisWeek) },
                { displayName: "Produced", value: String(produced) },
                { displayName: "Progress", value: weekPct + "%" }
            ];
            card.addEventListener("mousemove", (ev) => {
                try {
                    this.tooltipService.show({
                        coordinates: [ev.clientX, ev.clientY],
                        isTouchEvent: false,
                        dataItems: _tipItems,
                        identities: _selId ? [_selId] : []
                    });
                } catch (_e) {}
            });
            card.addEventListener("mouseout", () => {
                try { this.tooltipService.hide({ immediately: false, isTouchEvent: false }); } catch (_e) {}
            });
        }

        // Top: name + edit icon
        const top = this.el("div", "display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;");
        const name = this.el("span", "font-size:14px;font-weight:600;color:" + th.fg + ";");
        name.textContent = dp.name;
        top.appendChild(name);
        const editIcon = this.el("span", "color:" + th.fgMuted + ";display:flex;");
        this.setSVG(editIcon, '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>');
        top.appendChild(editIcon);
        card.appendChild(top);

        // Middle: donut + info
        const mid = this.el("div", "display:flex;align-items:center;gap:16px;");

        // Donut chart - size depends on number of delivery rings (supports up to 7)
        const ringCount = 1 + deliveries.length;
        const canvasSize = Math.max(120, 90 + ringCount * 10);
        const canvas = document.createElement("canvas");
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        canvas.style.cssText = "width:" + canvasSize + "px;height:" + canvasSize + "px;flex-shrink:0;";
        const totalDelQty = deliveries.reduce((s, d) => s + (d.qty || 0), 0);
        // Delivery fulfillment CAN use effectiveProduced (overflow counts toward shipping)
        const deliveryPct = totalDelQty > 0 ? Math.min(100, Math.round((effectiveProduced / totalDelQty) * 100)) : 0;
        // Goal ring uses produced ONLY (overflow does NOT count toward this week's goal)
        this.drawDonut(canvas, produced, goalThisWeek, deliveries, weekPct, deliveryPct, th);
        mid.appendChild(canvas);

        // Info column
        const info = this.el("div", "display:flex;flex-direction:column;gap:5px;flex:1;");

        // Produced qty
        const rowP = this.el("div", "display:flex;justify-content:space-between;font-size:12px;");
        const rPl = this.el("span", "color:" + th.fgMuted + ";");
        rPl.textContent = this.t("producedQty");
        rowP.appendChild(rPl);
        const rPv = this.el("span", "font-weight:700;color:" + th.green + ";font-size:13px;");
        rPv.textContent = Math.round(produced) + " " + this.t("pcs");
        rowP.appendChild(rPv);
        info.appendChild(rowP);

        // Previous week overflow indicator
        if (prevWeekOverflow > 0) {
            const prevWeekNum = this.currentWeekNum <= 1 ? 52 : this.currentWeekNum - 1;
            const rowOv = this.el("div", "display:flex;justify-content:space-between;font-size:11px;");
            const rOvl = this.el("span", "color:" + th.purple + ";font-style:italic;");
            rOvl.textContent = "+" + prevWeekOverflow + " " + this.t("overflow") + " (" + this.t("weekNum") + " " + prevWeekNum + ")";
            rowOv.appendChild(rOvl);
            info.appendChild(rowOv);
        }

        // Current week goal (green)
        const row1 = this.el("div", "display:flex;justify-content:space-between;font-size:12px;");
        const r1l = this.el("span", "color:" + th.fgMuted + ";");
        r1l.textContent = this.t("weekNum") + " " + this.currentWeekNum + " " + this.t("goalThisWeek").toLowerCase().split(" ").pop();
        row1.appendChild(r1l);
        const r1v = this.el("span", "font-weight:600;color:" + (thisWeekRemaining > 0 ? th.amber : th.green) + ";");
        r1v.textContent = Math.round(thisWeekProduced) + " / " + Math.round(goalThisWeek) + " " + this.t("pcs");
        row1.appendChild(r1v);
        info.appendChild(row1);

        // Next week goal
        if (goalNextWeek > 0) {
            const row2 = this.el("div", "display:flex;justify-content:space-between;font-size:12px;");
            const r2l = this.el("span", "color:" + th.fgMuted + ";");
            r2l.textContent = this.t("weekNum") + " " + this.nextWeekNum;
            row2.appendChild(r2l);
            const r2v = this.el("span", "font-weight:600;color:" + (nextWeekProduced >= goalNextWeek ? th.green : th.fg) + ";");
            r2v.textContent = Math.round(Math.min(nextWeekProduced, goalNextWeek)) + " / " + Math.round(goalNextWeek) + " " + this.t("pcs");
            row2.appendChild(r2v);
            info.appendChild(row2);
        }

        // Deliveries (blue rings info) — cumulative
        let cumDelQty = 0;
        deliveries.forEach((del, i) => {
            const availForThis = Math.max(0, effectiveProduced - cumDelQty);
            const filledThis = Math.min(availForThis, del.qty);
            const rowD = this.el("div", "display:flex;justify-content:space-between;font-size:12px;");
            const rDl = this.el("span", "color:" + th.accent + ";");
            rDl.textContent = this.t("deliveryQty") + (deliveries.length > 1 ? " #" + (i + 1) : "") + (del.date ? " (" + del.date + ")" : "");
            rowD.appendChild(rDl);
            const rDv = this.el("span", "font-weight:600;color:" + (filledThis >= del.qty ? th.green : th.accent) + ";");
            rDv.textContent = Math.round(filledThis) + " / " + Math.round(del.qty) + " " + this.t("pcs");
            rowD.appendChild(rDv);
            info.appendChild(rowD);
            cumDelQty += del.qty;
        });

        // Remaining (current week only)
        const row5 = this.el("div", "display:flex;justify-content:space-between;font-size:12px;margin-top:2px;padding-top:4px;border-top:1px solid " + th.border + ";");
        const r5l = this.el("span", "color:" + th.fgMuted + ";");
        r5l.textContent = this.t("remaining");
        row5.appendChild(r5l);
        const r5v = this.el("span", "font-weight:700;color:" + (thisWeekRemaining > 0 ? th.amber : th.green) + ";");
        r5v.textContent = Math.round(thisWeekRemaining) + " " + this.t("pcs");
        row5.appendChild(r5v);
        info.appendChild(row5);

        mid.appendChild(info);
        card.appendChild(mid);
        return card;
    }

    drawDonut(canvas, produced, weekGoal, deliveries, weekPct, deliveryPct, th) {
        const ctx = canvas.getContext("2d");
        const cx = canvas.width / 2, cy = canvas.height / 2;
        const delCount = Array.isArray(deliveries) ? deliveries.length : 0;
        // Dynamic sizing: thinner rings when more deliveries
        const lw = delCount > 4 ? 6 : 8;
        const delLw = delCount > 4 ? 4 : 5;
        const gap = delCount > 4 ? 1.5 : 2;

        // Outer ring (GREEN): weekly goal progress — leave space for top label
        const rOuter = Math.min(cx, cy) - 16;
        ctx.beginPath();
        ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
        ctx.strokeStyle = th.border;
        ctx.lineWidth = lw;
        ctx.lineCap = "butt";
        ctx.stroke();

        if (weekGoal > 0 && produced > 0) {
            const angle = Math.min(1, produced / weekGoal) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(cx, cy, rOuter, -Math.PI / 2, -Math.PI / 2 + angle);
            ctx.strokeStyle = th.green;
            ctx.lineWidth = lw;
            ctx.lineCap = "round";
            ctx.stroke();
        }

        // Weekly goal % ABOVE the donut
        ctx.fillStyle = th.green;
        ctx.font = "bold 11px 'Segoe UI',system-ui,sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(weekPct + "%", cx, cy - rOuter - 4);

        // Inner rings (BLUE): deliveries — cumulative logic (supports up to 7)
        if (Array.isArray(deliveries)) {
            let cumQty = 0;
            deliveries.forEach((del, i) => {
                const r = rOuter - (lw / 2 + gap) - i * (delLw + gap) - delLw / 2;
                if (r < 12) return;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = th.border;
                ctx.lineWidth = delLw;
                ctx.lineCap = "butt";
                ctx.stroke();

                if (del.qty > 0) {
                    const availForThis = Math.max(0, produced - cumQty);
                    const filledThis = Math.min(availForThis, del.qty);
                    const angle = Math.min(1, filledThis / del.qty) * Math.PI * 2;
                    if (filledThis > 0) {
                        ctx.beginPath();
                        ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + angle);
                        ctx.strokeStyle = th.accent;
                        ctx.lineWidth = delLw;
                        ctx.lineCap = "round";
                        ctx.stroke();
                    }
                    cumQty += del.qty;
                }
            });
        }

        // Center text: total delivery %
        const centerFontSize = delCount > 5 ? 11 : 13;
        ctx.fillStyle = th.fg;
        ctx.font = "bold " + centerFontSize + "px 'Segoe UI',system-ui,sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(deliveryPct + "%", cx, cy);
    }

    // ====== PRODUCT GOAL MODAL (HYBRID) ======
    // If goalQty / deliveryQty / deliveryDate data roles are bound, their values are read-only (source = data model).
    // If NOT bound, the user can enter them here and they are persisted via persistProperties (v29-style fallback).
    showProductGoalModal(productName) {
        this.closeModal();
        const th = THEMES[this.theme];
        const goals = this.getGoals(productName);
        const goalEditable = !this._goalBoundInData;
        const delEditable = !this._deliveryBoundInData;
        const anyEditable = goalEditable || delEditable;

        this.modalOverlay = this.el("div",
            "position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0," + (this.theme === "dark" ? "0.7" : "0.4") +
            ");display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);");

        const modal = this.el("div",
            "background:" + th.surface + ";border:1px solid " + th.border +
            ";border-radius:12px;padding:24px;width:90%;max-width:420px;box-shadow:" + th.shadowLg + ";color:" + th.fg + ";");

        // Title
        const titleRow = this.el("div", "display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;");
        const modalTitle = this.el("span", "font-size:16px;font-weight:600;color:" + th.fg + ";");
        modalTitle.textContent = this.t("setGoals") + " — " + productName;
        titleRow.appendChild(modalTitle);
        titleRow.appendChild(this.iconBtn(ICON_CLOSE, th, () => this.closeModal()));
        modal.appendChild(titleRow);

        // Notice: explain current mode
        if (!anyEditable) {
            const notice = this.el("div",
                "font-size:11px;color:" + th.fgMuted + ";background:" + (th.surfaceHover || th.bg) +
                ";border:1px dashed " + th.border + ";border-radius:6px;padding:8px 10px;margin-bottom:14px;");
            notice.textContent = this.language === "hu"
                ? "Ezek az értékek az adatforrásból érkeznek (Goal Qty / Delivery Date / Delivery Qty mezők). Módosításhoz a forrástáblát szerkeszd."
                : "These values come from your data source (Goal Qty / Delivery Date / Delivery Qty fields). Edit the source table to change them.";
            modal.appendChild(notice);
        } else if (goalEditable && delEditable) {
            const notice = this.el("div",
                "font-size:11px;color:" + th.fgMuted + ";background:" + (th.surfaceHover || th.bg) +
                ";border:1px dashed " + th.border + ";border-radius:6px;padding:8px 10px;margin-bottom:14px;");
            notice.textContent = this.language === "hu"
                ? "Kézzel beírt célok/kiszállítások — tippek a vizuálba lesznek mentve (persistProperties). Kösd be a Goal Qty / Delivery Qty / Delivery Date mezőket, ha adatmodellből akarod venni."
                : "Manually entered goals/deliveries — saved inside the visual (persistProperties). Bind Goal Qty / Delivery Qty / Delivery Date to read from the data model instead.";
            modal.appendChild(notice);
        }

        const makeReadOnlyRow = (label, value) => {
            const wrapper = this.el("div", "display:flex;flex-direction:column;gap:5px;");
            const lbl = this.el("label",
                "font-size:11px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;letter-spacing:0.3px;");
            lbl.textContent = label;
            wrapper.appendChild(lbl);
            const val = this.el("div",
                "padding:8px 10px;border:1px solid " + th.border +
                ";border-radius:8px;background:" + th.bg + ";color:" + th.fg +
                ";font-size:13px;opacity:0.9;");
            val.textContent = String(value == null ? "—" : value);
            wrapper.appendChild(val);
            return wrapper;
        };

        const form = this.el("div", "display:flex;flex-direction:column;gap:14px;");

        // Goal this week
        let goalThisInput = null, goalNextInput = null;
        if (goalEditable) {
            goalThisInput = this.makeNumberInput(
                this.t("goalThisWeek") + " (" + this.t("weekNum") + " " + this.currentWeekNum + ")",
                goals.goalThisWeek || 0, th);
            form.appendChild(goalThisInput.wrapper);
            goalNextInput = this.makeNumberInput(
                this.t("goalNextWeek") + " (" + this.t("weekNum") + " " + this.nextWeekNum + ")",
                goals.goalNextWeek || 0, th);
            form.appendChild(goalNextInput.wrapper);
        } else {
            form.appendChild(makeReadOnlyRow(
                this.t("goalThisWeek") + " (" + this.t("weekNum") + " " + this.currentWeekNum + ")",
                goals.goalThisWeek || 0));
            form.appendChild(makeReadOnlyRow(
                this.t("goalNextWeek") + " (" + this.t("weekNum") + " " + this.nextWeekNum + ")",
                goals.goalNextWeek || 0));
        }
        modal.appendChild(form);

        // Deliveries section
        const delSection = this.el("div", "display:flex;flex-direction:column;gap:10px;margin-top:14px;");
        const delHdr = this.el("div", "display:flex;align-items:center;justify-content:space-between;");
        const delTitle = this.el("span",
            "font-size:12px;font-weight:600;color:" + th.fg + ";text-transform:uppercase;letter-spacing:0.3px;");
        delTitle.textContent = this.t("deliveryQty");
        delHdr.appendChild(delTitle);

        const deliveryInputs = [];
        let addDelBtn = null;
        const delRows = this.el("div", "display:flex;flex-direction:column;gap:8px;");

        if (delEditable) {
            addDelBtn = this.el("button",
                "padding:2px 8px;border-radius:5px;cursor:pointer;font-size:11px;font-weight:600;" +
                "border:1px solid " + th.accent + ";background:transparent;color:" + th.accent + ";");
            addDelBtn.textContent = "+";
            delHdr.appendChild(addDelBtn);
        }
        delSection.appendChild(delHdr);

        const addEditableDeliveryRow = (qty, date) => {
            const row = this.el("div", "display:flex;gap:6px;align-items:flex-end;");
            const qtyIn = this.makeNumberInput(this.t("pcs"), qty, th);
            qtyIn.wrapper.style.flex = "1";
            row.appendChild(qtyIn.wrapper);
            const dateIn = this.makeDateInput(this.t("deliveryDate"), date, th);
            dateIn.wrapper.style.flex = "1";
            row.appendChild(dateIn.wrapper);
            const rmBtn = this.el("button",
                "padding:6px 8px;border-radius:6px;cursor:pointer;font-size:11px;margin-bottom:1px;" +
                "border:1px solid " + th.red + ";background:transparent;color:" + th.red + ";align-self:flex-end;");
            rmBtn.textContent = "✕";
            rmBtn.onclick = () => {
                const idx = deliveryInputs.findIndex(d => d.row === row);
                if (idx >= 0) deliveryInputs.splice(idx, 1);
                row.remove();
            };
            row.appendChild(rmBtn);
            delRows.appendChild(row);
            deliveryInputs.push({ qtyInput: qtyIn.input, dateInput: dateIn.input, row: row });
        };

        if (delEditable) {
            (goals.deliveries || []).forEach(d => addEditableDeliveryRow(d.qty, d.date));
            if (addDelBtn) addDelBtn.onclick = () => addEditableDeliveryRow(0, "");
        } else {
            if (goals.deliveries && goals.deliveries.length > 0) {
                goals.deliveries.forEach(d => {
                    const row = this.el("div",
                        "display:flex;justify-content:space-between;align-items:center;padding:6px 10px;" +
                        "border:1px solid " + th.border + ";border-radius:6px;background:" + th.bg + ";font-size:12px;");
                    const lhs = this.el("span", "color:" + th.fgMuted + ";");
                    lhs.textContent = d.date || this.t("none");
                    row.appendChild(lhs);
                    const rhs = this.el("span", "font-weight:600;color:" + th.fg + ";");
                    rhs.textContent = String(d.qty) + " " + this.t("pcs");
                    row.appendChild(rhs);
                    delRows.appendChild(row);
                });
            } else {
                const empty = this.el("div",
                    "padding:10px;border:1px dashed " + th.border + ";border-radius:6px;font-size:12px;color:" + th.fgMuted + ";text-align:center;");
                empty.textContent = this.language === "hu" ? "Nincs kiszállítás az adatban" : "No deliveries in data";
                delRows.appendChild(empty);
            }
        }
        delSection.appendChild(delRows);
        modal.appendChild(delSection);

        // Divider
        const divider = this.el("div", "height:1px;background:" + th.border + ";margin:20px 0 16px;");
        modal.appendChild(divider);

        // Buttons
        const btnRow = this.el("div", "display:flex;gap:8px;justify-content:flex-end;");

        if (anyEditable) {
            const cancelBtn = this.el("button",
                "padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:500;outline:none;transition:all 0.15s;" +
                "border:1px solid " + th.border + ";background:transparent;color:" + th.fg + ";");
            cancelBtn.textContent = this.t("cancel");
            cancelBtn.onmouseover = () => { cancelBtn.style.background = th.surfaceHover; };
            cancelBtn.onmouseout = () => { cancelBtn.style.background = "transparent"; };
            cancelBtn.onclick = () => this.closeModal();
            btnRow.appendChild(cancelBtn);

            const saveBtn = this.el("button",
                "padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;outline:none;transition:all 0.15s;" +
                "border:none;background:" + th.accent + ";color:#fff;");
            saveBtn.textContent = this.t("save");
            saveBtn.onmouseover = () => { saveBtn.style.opacity = "0.85"; };
            saveBtn.onmouseout = () => { saveBtn.style.opacity = "1"; };
            saveBtn.onclick = () => {
                if (!this.productGoalsUser) this.productGoalsUser = {};
                const existing = this.productGoalsUser[productName] || { goalByWeek: {}, deliveries: [] };
                if (goalEditable && goalThisInput && goalNextInput) {
                    const gbw = Object.assign({}, existing.goalByWeek || {});
                    gbw[String(this.currentWeekNum)] = Math.max(0, +goalThisInput.input.value || 0);
                    gbw[String(this.nextWeekNum)]    = Math.max(0, +goalNextInput.input.value || 0);
                    existing.goalByWeek = gbw;
                }
                if (delEditable) {
                    const dels = [];
                    deliveryInputs.forEach(d => {
                        const q = Math.max(0, +d.qtyInput.value || 0);
                        if (q > 0) dels.push({ qty: q, date: d.dateInput.value || "" });
                    });
                    existing.deliveries = dels;
                }
                this.productGoalsUser[productName] = existing;
                // Also reflect in merged productGoals so current render sees it immediately.
                if (!this.productGoals[productName]) this.productGoals[productName] = { goalByWeek: {}, deliveries: [] };
                if (goalEditable) this.productGoals[productName].goalByWeek = Object.assign({}, existing.goalByWeek || {});
                if (delEditable) this.productGoals[productName].deliveries = (existing.deliveries || []).map(d => ({ qty: d.qty, date: d.date }));
                this.saveState();
                this.closeModal();
                this.render();
            };
            btnRow.appendChild(saveBtn);
        } else {
            const closeBtn = this.el("button",
                "padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;outline:none;transition:all 0.15s;" +
                "border:none;background:" + th.accent + ";color:#fff;");
            closeBtn.textContent = this.t("close") || this.t("cancel");
            closeBtn.onmouseover = () => { closeBtn.style.opacity = "0.85"; };
            closeBtn.onmouseout = () => { closeBtn.style.opacity = "1"; };
            closeBtn.onclick = () => this.closeModal();
            btnRow.appendChild(closeBtn);
        }
        modal.appendChild(btnRow);

        this.modalOverlay.appendChild(modal);
        this.modalOverlay.addEventListener("click", (e) => {
            if (e.target === this.modalOverlay) this.closeModal();
        });
        this.target.style.position = "relative";
        this.target.appendChild(this.modalOverlay);
    }

    makeNumberInput(label, value, th) {
        const wrapper = this.el("div", "display:flex;flex-direction:column;gap:5px;");
        const lbl = this.el("label",
            "font-size:11px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;letter-spacing:0.3px;");
        lbl.textContent = label;
        wrapper.appendChild(lbl);
        const input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.value = value || 0;
        input.style.cssText = "padding:8px 10px;border:1px solid " + th.border +
            ";border-radius:8px;background:" + th.bg + ";color:" + th.fg +
            ";font-size:13px;outline:none;transition:border-color 0.15s;";
        input.onfocus = () => { input.style.borderColor = THEMES[this.theme].accent; };
        input.onblur = () => { input.style.borderColor = THEMES[this.theme].border; };
        wrapper.appendChild(input);
        return { wrapper, input };
    }

    makeDateInput(label, value, th) {
        const wrapper = this.el("div", "display:flex;flex-direction:column;gap:5px;");
        const lbl = this.el("label",
            "font-size:11px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;letter-spacing:0.3px;");
        lbl.textContent = label;
        wrapper.appendChild(lbl);
        const input = document.createElement("input");
        input.type = "date";
        input.value = value || "";
        input.style.cssText = "padding:8px 10px;border:1px solid " + th.border +
            ";border-radius:8px;background:" + th.bg + ";color:" + th.fg +
            ";font-size:13px;outline:none;transition:border-color 0.15s;cursor:pointer;" +
            "color-scheme:" + (this.theme === "dark" ? "dark" : "light") + ";";
        input.onfocus = () => { input.style.borderColor = THEMES[this.theme].accent; };
        input.onblur = () => { input.style.borderColor = THEMES[this.theme].border; };
        wrapper.appendChild(input);
        return { wrapper, input };
    }

    flowChip(area, th, isCurrent) {
        const col = this.typeColor(area.type, th);
        const bgCol = this.typeBgColor(area.type, th);
        const chip = this.el("div",
            "display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;font-size:12px;transition:all 0.15s;cursor:pointer;" +
            "background:" + (isCurrent ? bgCol : th.bg) + ";border:1px solid " + (isCurrent ? col : th.border) +
            ";color:" + (isCurrent ? col : th.fg) + ";font-weight:" + (isCurrent ? "600" : "400") + ";");
        const dot = this.el("span", "width:6px;height:6px;border-radius:50%;background:" + col + ";");
        chip.appendChild(dot);
        chip.appendChild(document.createTextNode(area.customName));
        if (!isCurrent) {
            chip.onclick = () => { this.selectedAreaId = area.id; this.saveState(); this.render(); };
            chip.onmouseover = () => { chip.style.borderColor = col; };
            chip.onmouseout = () => { chip.style.borderColor = th.border; };
        }
        return chip;
    }

    buildEmpty(th) {
        const wrap = this.el("div", "display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;");
        const icon = this.el("div", "color:" + th.fgMuted + ";opacity:0.25;margin-bottom:16px;");
        this.setSVG(icon, '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>');
        wrap.appendChild(icon);
        const t1 = this.el("div", "font-size:15px;font-weight:600;color:" + th.fg + ";margin-bottom:4px;");
        t1.textContent = this.t("emptyTitle");
        wrap.appendChild(t1);
        const t2 = this.el("div", "font-size:12px;color:" + th.fgMuted + ";max-width:220px;line-height:1.4;");
        t2.textContent = this.t("emptySubtitle");
        wrap.appendChild(t2);
        return wrap;
    }

    // --- AREA MODAL ---
    showProductRoutingModal(area, reachableProds, tempState, onChange) {
        // Note: this modal is layered ON TOP of the area modal. It does not call closeModal()
        // because that would close the area modal too.
        const th = THEMES[this.theme];
        const overlay = this.el("div",
            "position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);" +
            "display:flex;align-items:center;justify-content:center;z-index:1100;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);");
        overlay.onclick = (e) => { if (e.target === overlay) this.target.removeChild(overlay); };

        const modal = this.el("div",
            "background:" + th.surface + ";border:1px solid " + th.border + ";border-radius:12px;" +
            "padding:20px;width:90%;max-width:460px;max-height:80%;display:flex;flex-direction:column;" +
            "box-shadow:" + th.shadowLg + ";color:" + th.fg + ";");

        // Title
        const titleEl = this.el("div", "font-size:15px;font-weight:700;color:" + th.fg + ";margin-bottom:4px;");
        titleEl.textContent = this.t("productRouting");
        modal.appendChild(titleEl);
        const subtitle = this.el("div", "font-size:11px;color:" + th.fgMuted + ";margin-bottom:14px;");
        subtitle.textContent = this.t("productRoutingHint");
        modal.appendChild(subtitle);

        // v3.3.49: grouping dropdown — split by individual products / Type Level 1/2/3
        const grpRow = this.el("div", "display:flex;align-items:center;gap:8px;margin-bottom:10px;flex:0 0 auto;");
        const grpLbl = this.el("span", "font-size:11px;font-weight:600;color:" + th.fg + ";");
        grpLbl.textContent = this.t("routingGroupBy") + ":";
        grpRow.appendChild(grpLbl);
        const grpSel = this.el("select",
            "padding:4px 8px;font-size:11px;background:" + th.surface + ";color:" + th.fg +
            ";border:1px solid " + th.border + ";border-radius:4px;cursor:pointer;outline:none;flex:1;");
        const _grpOpts = [
            { value: "", labelKey: "routingGroupNone" },
            { value: "typeLevel1", labelKey: "groupByTL1" },
            { value: "typeLevel2", labelKey: "groupByTL2" },
            { value: "typeLevel3", labelKey: "groupByTL3" }
        ];
        for (const _o of _grpOpts) {
            const opt = this.el("option");
            opt.value = _o.value;
            opt.textContent = this.t(_o.labelKey);
            grpSel.appendChild(opt);
        }
        grpSel.value = area.routingGroupKey || "";
        grpRow.appendChild(grpSel);
        modal.appendChild(grpRow);

        // Scrollable list area
        const listArea = this.el("div", "flex:1 1 auto;overflow-y:auto;display:flex;flex-direction:column;gap:3px;padding-right:4px;min-height:0;");

        // v3.3.48: Build product list robustly — cycleTimeMap may be incomplete due to
        // Power BI's dataReductionAlgorithm truncating large dataviews. Use a 3-step
        // fallback: (1) products with cycle time on this area's machines, (2) infer the
        // product types this area produces and include all dataProducts of those types,
        // (3) apply per-machine allowedProducts restriction.
        const _producedProducts = new Set();
        const _myMachineRefs = area.machines || [];
        const _myMachineNames = _myMachineRefs.map(m => m.name);
        // v3.7+: include cycleTimeAlias names so split machines (SP-1 Pinion,
        // SP-1 Ring, etc.) that look up cycle times under the original physical
        // machine name (SP-1) still resolve products correctly.
        const _myCtKeys = new Set(_myMachineNames);
        for (const _mm of _myMachineRefs) {
            if (_mm.cycleTimeAlias) _myCtKeys.add(_mm.cycleTimeAlias);
        }

        // (1) products with cycle time data on this area's machines (or their aliases)
        for (const _key in this.cycleTimeMap) {
            const _parts = _key.split("||");
            if (_myCtKeys.has(_parts[0]) && _parts[1]) _producedProducts.add(_parts[1]);
        }

        // (2) infer the productType set produced here, then include all dataProducts of those types
        const _areaTypes = new Set();
        for (const _pn of _producedProducts) {
            const _t = this.productTypeMap && this.productTypeMap[_pn];
            if (_t) _areaTypes.add(String(_t).toLowerCase());
        }
        if (_areaTypes.size > 0) {
            for (const dp of this.dataProducts) {
                const _t = String((this.productTypeMap && this.productTypeMap[dp.name]) || "").toLowerCase();
                if (_areaTypes.has(_t)) _producedProducts.add(dp.name);
            }
        }

        // (3) restrict by per-machine allowedProducts: keep only products at least ONE machine allows.
        // v3.7+: when steps (1)+(2) yielded nothing (e.g. cycle-time map was
        // truncated by PBI dataReduction OR the machines were split with
        // aliases), fall back to the UNION of allowedProducts as the produced
        // set — otherwise routing modal would render empty for valid areas.
        const _hasRestriction = _myMachineRefs.some(m => m.allowedProducts && m.allowedProducts.length > 0);
        if (_hasRestriction) {
            const _allowedUnion = new Set();
            let _anyUnrestricted = false;
            for (const m of _myMachineRefs) {
                if (m.allowedProducts && m.allowedProducts.length > 0) {
                    for (const _ap of m.allowedProducts) _allowedUnion.add(_ap);
                } else {
                    _anyUnrestricted = true;
                    break;
                }
            }
            if (!_anyUnrestricted && _allowedUnion.size > 0) {
                if (_producedProducts.size === 0) {
                    // Fallback: seed the produced set from allowedProducts union.
                    for (const _ap of _allowedUnion) _producedProducts.add(_ap);
                } else {
                    for (const _pn of [..._producedProducts]) {
                        if (!_allowedUnion.has(_pn)) _producedProducts.delete(_pn);
                    }
                }
            }
        }

        const _productList = [..._producedProducts].sort();
        const _selects = {};
        const _typeLevelMap = this.productTypeLevelMap || {};

        // v3.3.49: rebuild list when grouping selection changes
        const _rebuildList = () => {
            this.clearNode(listArea);
            for (const k of Object.keys(_selects)) delete _selects[k];

            const _gKey = grpSel.value || "";
            const _items = [];
            const _seen = new Set();
            for (const _pn of _productList) {
                let _key = _pn;
                let _label = _pn;
                if (_gKey) {
                    const _entry = _typeLevelMap[_pn] || {};
                    const _v = _entry[_gKey];
                    if (_v == null || _v === "") continue;
                    _key = String(_v);
                    _label = String(_v);
                }
                if (_seen.has(_key)) continue;
                _seen.add(_key);
                _items.push({ key: _key, label: _label });
            }
            _items.sort((a, b) => a.label.localeCompare(b.label));

            for (const _it of _items) {
                const row = this.el("div",
                    "display:flex;align-items:center;gap:8px;padding:6px 10px;background:" + th.bg + ";border-radius:6px;");
                const lbl = this.el("span", "flex:1;font-size:12px;color:" + th.fg + ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap;");
                lbl.textContent = _it.label;
                row.appendChild(lbl);
                const sel = this.el("select",
                    "padding:4px 8px;font-size:11px;background:" + th.surface + ";color:" + th.fg +
                    ";border:1px solid " + th.border + ";border-radius:4px;cursor:pointer;outline:none;min-width:160px;");
                const optDefault = this.el("option");
                optDefault.value = "";
                optDefault.textContent = this.t("defaultRoute");
                sel.appendChild(optDefault);
                for (const _ra of reachableProds) {
                    const opt = this.el("option");
                    opt.value = _ra.id;
                    opt.textContent = _ra.customName;
                    sel.appendChild(opt);
                }
                sel.value = tempState[_it.key] || "";
                row.appendChild(sel);
                listArea.appendChild(row);
                _selects[_it.key] = sel;
            }
        };

        _rebuildList();
        grpSel.onchange = () => _rebuildList();

        modal.appendChild(listArea);

        // Footer with buttons (always visible at bottom)
        const footer = this.el("div", "display:flex;gap:8px;justify-content:flex-end;margin-top:14px;flex:0 0 auto;");
        const cancelBtn = this.el("button",
            "padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:500;outline:none;" +
            "border:1px solid " + th.border + ";background:transparent;color:" + th.fg + ";");
        cancelBtn.textContent = this.t("cancel");
        cancelBtn.onclick = () => this.target.removeChild(overlay);
        footer.appendChild(cancelBtn);
        const saveBtn = this.el("button",
            "padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;outline:none;" +
            "border:none;background:" + th.accent + ";color:#fff;");
        saveBtn.textContent = this.t("save");
        saveBtn.onclick = () => {
            // v3.3.49: clear previous routing entries (group key may have changed → keys differ),
            // then write the new ones from _selects. Also persist area.routingGroupKey.
            for (const _pn of Object.keys(tempState)) delete tempState[_pn];
            for (const _key in _selects) {
                const v = _selects[_key].value;
                if (v) tempState[_key] = v;
            }
            area.routingGroupKey = grpSel.value || "";
            this.target.removeChild(overlay);
            if (typeof onChange === "function") onChange();
        };
        footer.appendChild(saveBtn);
        modal.appendChild(footer);

        overlay.appendChild(modal);
        this.target.appendChild(overlay);
    }

    showAreaModal(area) {
        this.closeModal();
        const th = THEMES[this.theme];
        this.modalOverlay = this.el("div",
            "position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0," + (this.theme === "dark" ? "0.7" : "0.4") +
            ");display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);");

        const modal = this.el("div",
            "background:" + th.surface + ";border:1px solid " + th.border +
            ";border-radius:12px;padding:24px;width:90%;max-width:380px;box-shadow:" + th.shadowLg + ";color:" + th.fg + ";");

        // Title
        const titleRow = this.el("div", "display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;");
        const modalTitle = this.el("span", "font-size:16px;font-weight:600;color:" + th.fg + ";");
        modalTitle.textContent = area ? this.t("edit") + " — " + area.customName : this.t("addArea");
        titleRow.appendChild(modalTitle);
        titleRow.appendChild(this.iconBtn(ICON_CLOSE, th, () => this.closeModal()));
        modal.appendChild(titleRow);

        const form = this.el("div", "display:flex;flex-direction:column;gap:14px;");

        // Type select
        const typeSelect = this.makeSelect(this.t("areaType"), [
            { value: "production", label: this.t("production") },
            { value: "quality", label: this.t("quality") },
            { value: "buffer", label: this.t("buffer") }
        ], area ? area.type : "production", th);
        form.appendChild(typeSelect.wrapper);

        // Name input
        const nameInput = this.makeInput(this.t("customName"), area ? area.customName : "", th);
        form.appendChild(nameInput.wrapper);

        // Before/after multi-select (checkbox lists)
        const otherAreasList = [];
        this.areas.forEach(a => {
            if (!area || a.id !== area.id)
                otherAreasList.push({ id: a.id, name: a.customName, type: a.type });
        });
        const curBeforeIds = area ? (area.beforeAreaIds || []) : [];
        const curAfterIds = area ? (area.afterAreaIds || []) : [];
        const beforeChecks = this.makeCheckboxList(this.t("before"), otherAreasList, curBeforeIds, th);
        form.appendChild(beforeChecks.wrapper);
        const afterChecks = this.makeCheckboxList(this.t("after"), otherAreasList, curAfterIds, th);
        form.appendChild(afterChecks.wrapper);

        // v3.3.47: product routing — replaced inline list with a button that opens a separate
        // scrollable modal (avoids overflowing the area modal when there are many products).
        // Temp routing state lives here; the routing modal updates it; saveBtn persists it.
        let _routingTempState = Object.assign({}, area && area.productRouting ? area.productRouting : {});
        const routingButtonRow = this.el("div", "");
        form.appendChild(routingButtonRow);

        const _getReachableProds = () => {
            const _selectedAfters = afterChecks.getSelected();
            const _reachable = [];
            const _seen = new Set();
            const _walk = (aid) => {
                if (_seen.has(aid)) return;
                _seen.add(aid);
                const _a = this.areas.find(x => x.id === aid);
                if (!_a) return;
                if (_a.type === "production") _reachable.push(_a);
                else if (_a.type === "buffer") for (const _next of (_a.afterAreaIds || [])) _walk(_next);
            };
            for (const _aid of _selectedAfters) _walk(_aid);
            return _reachable;
        };

        const _refreshRoutingButton = () => {
            this.clearNode(routingButtonRow);
            if (!area || area.type !== "production") return;
            const _reachable = _getReachableProds();
            if (_reachable.length < 2) return;

            const _setCount = Object.keys(_routingTempState).filter(k => _routingTempState[k]).length;
            const wrapper = this.el("div", "display:flex;flex-direction:column;gap:4px;margin-top:4px;");
            const lbl = this.el("div", "font-size:11px;font-weight:600;color:" + th.fg + ";");
            lbl.textContent = this.t("productRouting");
            wrapper.appendChild(lbl);
            const btn = this.el("button",
                "display:flex;align-items:center;justify-content:space-between;gap:6px;padding:8px 10px;border-radius:6px;cursor:pointer;" +
                "font-size:11px;font-weight:500;outline:none;border:1px solid " + th.border + ";background:" + th.bg + ";color:" + th.fg + ";");
            const btnLeft = this.el("span", "");
            btnLeft.textContent = this.t("configRouting");
            btn.appendChild(btnLeft);
            const btnRight = this.el("span", "font-size:10px;color:" + th.fgMuted + ";");
            btnRight.textContent = _setCount > 0 ? (_setCount + " " + this.t("routingCount")) : this.t("noRouting");
            btn.appendChild(btnRight);
            btn.onclick = () => this.showProductRoutingModal(area, _reachable, _routingTempState, () => _refreshRoutingButton());
            wrapper.appendChild(btn);
            routingButtonRow.appendChild(wrapper);
        };

        let getProductRouting = () => _routingTempState;
        _refreshRoutingButton();
        afterChecks.wrapper.addEventListener("change", () => _refreshRoutingButton());

        modal.appendChild(form);

        // Divider
        const divider = this.el("div", "height:1px;background:" + th.border + ";margin:20px 0 16px;");
        modal.appendChild(divider);

        // Buttons
        const btnRow = this.el("div", "display:flex;gap:8px;justify-content:flex-end;");

        if (area) {
            const delBtn = this.el("button",
                "display:flex;align-items:center;gap:4px;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;" +
                "font-weight:500;outline:none;transition:all 0.15s;border:1px solid " + th.red +
                ";background:" + th.redSoft + ";color:" + th.red + ";margin-right:auto;");
            this.setSVG(delBtn, '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> ');
            delBtn.appendChild(document.createTextNode(" " + this.t("delete")));
            delBtn.onmouseover = () => { delBtn.style.background = th.red; delBtn.style.color = "#fff"; };
            delBtn.onmouseout = () => { delBtn.style.background = th.redSoft; delBtn.style.color = th.red; };
            delBtn.onclick = () => { this.deleteArea(area.id); this.closeModal(); };
            btnRow.appendChild(delBtn);
        }

        const cancelBtn = this.el("button",
            "padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:500;outline:none;transition:all 0.15s;" +
            "border:1px solid " + th.border + ";background:transparent;color:" + th.fg + ";");
        cancelBtn.textContent = this.t("cancel");
        cancelBtn.onmouseover = () => { cancelBtn.style.background = th.surfaceHover; };
        cancelBtn.onmouseout = () => { cancelBtn.style.background = "transparent"; };
        cancelBtn.onclick = () => this.closeModal();
        btnRow.appendChild(cancelBtn);

        const saveBtn = this.el("button",
            "padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;outline:none;transition:all 0.15s;" +
            "border:none;background:" + th.accent + ";color:#fff;");
        saveBtn.textContent = this.t("save");
        saveBtn.onmouseover = () => { saveBtn.style.opacity = "0.85"; };
        saveBtn.onmouseout = () => { saveBtn.style.opacity = "1"; };
        saveBtn.onclick = () => {
            const name = nameInput.input.value.trim();
            if (!name) { nameInput.input.style.borderColor = th.red; return; }
            if (area) {
                area.type = typeSelect.select.value;
                area.customName = name;
                area.beforeAreaIds = beforeChecks.getSelected();
                area.afterAreaIds = afterChecks.getSelected();
                // v3.3.46: persist product routing
                area.productRouting = getProductRouting();
            } else {
                const newArea = {
                    id: "a" + Date.now().toString(36) + (window.crypto.getRandomValues(new Uint32Array(1))[0]).toString(36).substring(0, 3),
                    type: typeSelect.select.value,
                    customName: name,
                    beforeAreaIds: beforeChecks.getSelected(),
                    afterAreaIds: afterChecks.getSelected(),
                    shiftSettings: this.getDefaultShiftSettings()
                };
                this.areas.push(newArea);
                this.selectedAreaId = newArea.id;
            }
            this.saveState();
            this.closeModal();
            this.render();
        };
        btnRow.appendChild(saveBtn);
        modal.appendChild(btnRow);

        this.modalOverlay.appendChild(modal);
        this.modalOverlay.addEventListener("click", (e) => {
            if (e.target === this.modalOverlay) this.closeModal();
        });
        this.target.style.position = "relative";
        this.target.appendChild(this.modalOverlay);
        setTimeout(() => nameInput.input.focus(), 50);
    }

    closeModal() {
        if (this.modalOverlay?.parentNode) {
            this.modalOverlay.parentNode.removeChild(this.modalOverlay);
            this.modalOverlay = null;
        }
    }

    makeSelect(label, options, value, th) {
        const wrapper = this.el("div", "display:flex;flex-direction:column;gap:5px;");
        const lbl = this.el("label",
            "font-size:11px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;letter-spacing:0.3px;");
        lbl.textContent = label;
        wrapper.appendChild(lbl);
        const select = document.createElement("select");
        select.style.cssText = "padding:8px 10px;border:1px solid " + th.border +
            ";border-radius:8px;background:" + th.bg + ";color:" + th.fg +
            ";font-size:13px;outline:none;transition:border-color 0.15s;cursor:pointer;";
        for (const o of (options || [])) {
            const opt = document.createElement("option");
            opt.value = o.value;
            opt.textContent = o.label;
            if (String(o.value) === String(value)) opt.selected = true;
           
            select.appendChild(opt);
        }
        select.onfocus = () => { select.style.borderColor = THEMES[this.theme].accent; };
        select.onblur = () => { select.style.borderColor = THEMES[this.theme].border; };
        wrapper.appendChild(select);
        return { wrapper, select };
    }

    makeInput(label, value, th) {
        const wrapper = this.el("div", "display:flex;flex-direction:column;gap:5px;");
        const lbl = this.el("label",
            "font-size:11px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;letter-spacing:0.3px;");
        lbl.textContent = label;
        wrapper.appendChild(lbl);
        const input = document.createElement("input");
        input.type = "text";
        input.value = value != null ? value : "";
        input.style.cssText = "padding:8px 10px;border:1px solid " + th.border +
            ";border-radius:8px;background:" + th.bg + ";color:" + th.fg +
            ";font-size:13px;outline:none;transition:border-color 0.15s;";
        input.onfocus = () => { input.style.borderColor = THEMES[this.theme].accent; };
        input.onblur = () => { input.style.borderColor = THEMES[this.theme].border; };
        wrapper.appendChild(input);
        return { wrapper, input };
    }

    makeCheckboxList(label, items, selectedIds, th) {
        const wrapper = this.el("div", "display:flex;flex-direction:column;gap:5px;");
        const lbl = this.el("label",
            "font-size:11px;font-weight:600;color:" + th.fgMuted + ";text-transform:uppercase;letter-spacing:0.3px;");
        lbl.textContent = label;
        wrapper.appendChild(lbl);
        const listBox = this.el("div",
            "max-height:110px;overflow-y:auto;border:1px solid " + th.border +
            ";border-radius:8px;background:" + th.bg + ";padding:4px;");
        if (!items || items.length === 0) {
            const emptyLbl = this.el("div",
                "font-size:11px;color:" + th.fgMuted + ";padding:6px 8px;font-style:italic;");
            emptyLbl.textContent = this.t("none");
            listBox.appendChild(emptyLbl);
        }
        const checkboxes = [];
        (items || []).forEach(item => {
            const row = this.el("label",
                "display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:12px;color:" + th.fg + ";");
            row.onmouseover = () => { row.style.background = th.surfaceHover; };
            row.onmouseout = () => { row.style.background = "transparent"; };
            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.value = item.id;
            cb.checked = (selectedIds || []).includes(item.id);
            cb.style.cssText = "cursor:pointer;accent-color:" + th.accent + ";";
            row.appendChild(cb);
            if (typeof this.typeBgColor === "function" && typeof this.typeColor === "function" && item.type) {
                const typeBadge = this.el("span",
                    "font-size:9px;font-weight:600;padding:1px 5px;border-radius:4px;background:" +
                    this.typeBgColor(item.type, th) + ";color:" + this.typeColor(item.type, th) + ";");
                typeBadge.textContent = this.t(item.type);
                row.appendChild(typeBadge);
            }
            const nameLbl = this.el("span", "");
            nameLbl.textContent = item.name;
            row.appendChild(nameLbl);
            listBox.appendChild(row);
            checkboxes.push(cb);
        });
        wrapper.appendChild(listBox);
        return {
            wrapper,
            getSelected: () => checkboxes.filter(cb => cb.checked).map(cb => cb.value)
        };
    }

    deleteArea(id) {
        this.areas = this.areas.filter(a => a.id !== id);
        this.areas.forEach(a => {
            if (a.beforeAreaIds) a.beforeAreaIds = a.beforeAreaIds.filter(x => x !== id);
            if (a.afterAreaIds) a.afterAreaIds = a.afterAreaIds.filter(x => x !== id);
        });
        if (this.selectedAreaId === id) {
            this.selectedAreaId = this.areas.length > 0 ? this.areas[0].id : null;
        }
        this.saveState();
        this.render();
    }
}
