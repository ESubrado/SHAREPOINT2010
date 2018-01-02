var LOCAL = (function (local) {

    local.iniFupSource = getIniFup();
    local.studyBlindedStatusSource = getStudyBlindedStatus();
    local.suspectProductSource = getSuspectProductRole();
    local.booleanValues = getBooleanValues();
    local.dilSequenceSource = getDilSequence();

    return local;

    function getIniFup() {
        return [
            { "id": 1, "iniOrFup": "I" },
            { "id": 2, "iniOrFup": "FU" },
        ];
    }

    function getStudyBlindedStatus() {
        return [
            { "id": 1, "StudyBlindedStatusName": "Blinded" },
            { "id": 2, "StudyBlindedStatusName": "Open" },
        ];
    }

    function getSuspectProductRole() {
        return [
             { "id": 1, "PrimarySuspectProductRole": "Verum" },
             { "id": 2, "PrimarySuspectProductRole": "Comparator" },
             { "id": 3, "PrimarySuspectProductRole": "Unknown" },
             { "id": 4, "PrimarySuspectProductRole": "Other" },
        ];
    }

    function getBooleanValues() {
        return [
            { "id": 1, "booleanValue": "Yes" },
            { "id": 2, "booleanValue": "No" },
        ];
    }

    function getDilSequence() {
        return [
            { "id": 1, "dilSequence": 0 },
            { "id": 2, "dilSequence": 1 },
            { "id": 3, "dilSequence": 2 },
            { "id": 4, "dilSequence": 3 },
            { "id": 5, "dilSequence": 4 },
            { "id": 6, "dilSequence": 5 },
            { "id": 7, "dilSequence": 6 },
            { "id": 8, "dilSequence": 7 },
            { "id": 9, "dilSequence": 8 },
            { "id": 10, "dilSequence": 9 },
            { "id": 11, "dilSequence": 10 },
            { "id": 12, "dilSequence": 11 },
            { "id": 13, "dilSequence": 12 },
            { "id": 14, "dilSequence": 13 },
            { "id": 15, "dilSequence": 14 },
            { "id": 16, "dilSequence": 15 },
            { "id": 17, "dilSequence": 16 },
            { "id": 18, "dilSequence": 17 },
            { "id": 19, "dilSequence": 18 },
            { "id": 20, "dilSequence": 19 },
            { "id": 21, "dilSequence": 20 },
            { "id": 22, "dilSequence": 21 },
            { "id": 23, "dilSequence": 22 },
            { "id": 24, "dilSequence": 23 },
            { "id": 25, "dilSequence": 24 },
            { "id": 26, "dilSequence": 25 },
            { "id": 27, "dilSequence": 26 },
            { "id": 28, "dilSequence": 27 },
            { "id": 29, "dilSequence": 28 },
            { "id": 30, "dilSequence": 29 },
            { "id": 31, "dilSequence": 30 },
            { "id": 32, "dilSequence": 31 },
            { "id": 33, "dilSequence": 32 },
            { "id": 34, "dilSequence": 33 },
            { "id": 35, "dilSequence": 34 },
            { "id": 36, "dilSequence": 35 },
            { "id": 37, "dilSequence": 36 },
            { "id": 38, "dilSequence": 37 },
            { "id": 39, "dilSequence": 38 },
            { "id": 40, "dilSequence": 39 },
            { "id": 41, "dilSequence": 40 },
            { "id": 42, "dilSequence": 41 },
            { "id": 43, "dilSequence": 42 },
            { "id": 44, "dilSequence": 43 },
            { "id": 45, "dilSequence": 44 },
            { "id": 46, "dilSequence": 45 },
            { "id": 47, "dilSequence": 46 },
            { "id": 48, "dilSequence": 47 },
            { "id": 49, "dilSequence": 48 },
            { "id": 50, "dilSequence": 49 },
            { "id": 51, "dilSequence": 50 },
            { "id": 52, "dilSequence": 51 },
            { "id": 53, "dilSequence": 52 },
            { "id": 54, "dilSequence": 53 },
            { "id": 55, "dilSequence": 54 },
            { "id": 56, "dilSequence": 55 },
            { "id": 57, "dilSequence": 56 },
            { "id": 58, "dilSequence": 57 },
            { "id": 59, "dilSequence": 58 },
            { "id": 60, "dilSequence": 59 },
            { "id": 61, "dilSequence": 60 },
            { "id": 62, "dilSequence": 61 },
            { "id": 63, "dilSequence": 62 },
            { "id": 64, "dilSequence": 63 },
            { "id": 65, "dilSequence": 64 },
            { "id": 66, "dilSequence": 65 },
            { "id": 67, "dilSequence": 66 },
            { "id": 68, "dilSequence": 67 },
            { "id": 69, "dilSequence": 68 },
            { "id": 70, "dilSequence": 69 },
            { "id": 71, "dilSequence": 70 },
            { "id": 72, "dilSequence": 71 },
            { "id": 73, "dilSequence": 72 },
            { "id": 74, "dilSequence": 73 },
            { "id": 75, "dilSequence": 74 },
            { "id": 76, "dilSequence": 75 },
            { "id": 77, "dilSequence": 76 },
            { "id": 78, "dilSequence": 77 },
            { "id": 79, "dilSequence": 78 },
            { "id": 80, "dilSequence": 79 },
            { "id": 81, "dilSequence": 80 },
            { "id": 82, "dilSequence": 81 },
            { "id": 83, "dilSequence": 82 },
            { "id": 84, "dilSequence": 83 },
            { "id": 85, "dilSequence": 84 },
            { "id": 86, "dilSequence": 85 },
            { "id": 87, "dilSequence": 86 },
            { "id": 88, "dilSequence": 87 },
            { "id": 89, "dilSequence": 88 },
            { "id": 90, "dilSequence": 89 },
            { "id": 91, "dilSequence": 90 },
            { "id": 92, "dilSequence": 91 },
            { "id": 93, "dilSequence": 92 },
            { "id": 94, "dilSequence": 93 },
            { "id": 95, "dilSequence": 94 },
            { "id": 96, "dilSequence": 95 },
            { "id": 97, "dilSequence": 96 },
            { "id": 98, "dilSequence": 97 },
            { "id": 99, "dilSequence": 98 },
            { "id": 100, "dilSequence": 99 },
            { "id": 101, "dilSequence": 100 },
        ];
    }
}(LOCAL || {}));