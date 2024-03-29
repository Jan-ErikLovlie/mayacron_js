// Copyright 2017 Jan-Erik Lovlie

    function getMayan(yyyy, mm, dd) {

      // Note: The value associated with the energy in this enum is only for calculation purposes.
      // The Number associated with each energy changes 5 positions from year to year due to the uayeb (5 extra days). 
      // For example:
      // On 2018.04.13, the energy was CABAN and it fell on day 11 of the 20 day cycle.
      // On 2018.03.04, the energy was CABAN and it fell on day 16 of the 20 day cycle.
       var MayanEnergyEnum = {
         1 : "IK",
         2 : "AKBAL",
         3 : "KAN",
         4 : "CHICCHAN",
         5 : "KIMI",
         6 : "MANIK",
         7 : "LAMAT",
         8 : "MULUK",
         9 : "OC",
         10 : "CHUEN",
         11 : "EB",
         12 : "BEN",
         13 : "IX",
         14 : "MEN",
         15 : "CIB",
         16 : "CABAN",
         17 : "EDZNAB",
         18 : "CAUAC",
         19 : "AHAU",
         20 : "IMIX"
       };
       Object.freeze(MayanEnergyEnum)

       // Now the DominantMayanEnergy
       var dominantMayanEnergy = 20;
       var dominantDay = 2;

       var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
       var firstDate = new Date(2013,03,04);
       var secondDate = new Date(yyyy,mm-1,dd);
       // TODO: Fix for 1582.10.4 to 1582.10.15
       var diffDays = Math.round((secondDate.getTime() - firstDate.getTime())/(oneDay));
       var mayanEnergyValue = 1;
       var mayanEnergyName = MayanEnergyEnum[mayanEnergyValue];

       // cycle through the energies x number of times based on the diffDays
       if (diffDays > 0) {
         for (i = 0; i < diffDays; i++) {
            if (mayanEnergyValue == 20) {
              mayanEnergyValue = 1;
            } else {
              mayanEnergyValue++;
            }

            if (dominantDay == 13) {
               // Set the dominantMayanEnergy to the current one.
               dominantMayanEnergy = mayanEnergyValue;
               // Set the dominantDay to 1.
               dominantDay = 1;
            } else {
               dominantDay++;
            }

         }
       } else if (diffDays < 0) {
         for (i = 0; i > diffDays; i--) {
            if (mayanEnergyValue == 1) {
              mayanEnergyValue = 20;
            } else {
              mayanEnergyValue--;
            }

            if (dominantDay == 1) {
               // Set the dominantMayanEnergy to the one 13 days ago.
               var previousDominantValue = dominantMayanEnergy;
               for (j = 0; j < 13; j++) {
                 if (previousDominantValue == 1) {
                    previousDominantValue = 20;
                 } else {
                    previousDominantValue--;
                 }
               }
               dominantMayanEnergy = previousDominantValue;
               // Set the dominantDay to 13.
               dominantDay = 13;
            } else {
               dominantDay--;
            }

         }
       }

       mayanEnergyName = MayanEnergyEnum[mayanEnergyValue];
       var dominantEnergyName = MayanEnergyEnum[dominantMayanEnergy];

       var mayanInfo = mayanEnergyName + " " + dominantEnergyName + "(Day " + dominantDay + ")";

       return mayanInfo;
    }
