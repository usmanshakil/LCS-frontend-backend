const Joi = require("joi");
const JOI_MSG = require("./joiValidation");
module.exports = {
  validateBody: (schema) => {
    // console.log(schema)
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        throw result.error;
        // return res.status(400).json({data:result.error})
      }
      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  schemas: {
    signUpSchema: Joi.object().keys({
      first_name: Joi.string()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
      last_name: Joi.string()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.LAST_NAME)),
      email: Joi.string()
        .email()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.EMAIL)),
      password: Joi.string()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.PASSWORD)),
      phone: Joi.number().required().error(new Error(JOI_MSG.USER_INFO.PHONE)),
      cellphone: Joi.number()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.CELLPHONE)),
      role_id: Joi.number()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.ROLE_ID)),
      signature: Joi.string()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.SIGNATURE)),
      comment: Joi.string().allow(""),
    }),
    signInSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.EMAIL)),
      password: Joi.string()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.PASSWORD)),
    }),
    forgotPasswordSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.EMAIL)),
    }),
    resetPasswordSchema: Joi.object().keys({
      new_password: Joi.string()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.NEW_PASSWORD)),
      signature: Joi.string()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.SIGNATURE)),
    }),
    supportSchema: Joi.object().keys({
      // name:Joi.string(),
      // email:Joi.string().email(),
      // phone:Joi.string(),
      subject: Joi.string()
        .required()
        .error(new Error(JOI_MSG.SUPPORT.SUBJECT)),
      message: Joi.string()
        .required()
        .error(new Error(JOI_MSG.SUPPORT.MESSAGE)),
    }),
    addChildSchema: Joi.object().keys({
      childInfo: {
        first_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
        last_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.LAST_NAME)),
        birth_date: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
        birth_place: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
        admission_date: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
        address: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
        city: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
        state: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
        zip_code: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
        class_id: Joi.number().default(1),
      },
      parent1: {
        parent_type: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.PARENT_TYPE)),
        first_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
        last_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.LAST_NAME)),
        phone1: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.PHONE1)),
        phone2: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.PHONE2)),
        email1: Joi.string()
          .email()
          .required()
          .error(new Error(JOI_MSG.PARENT1.EMAIL1)),
        address: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.ADDRESS)),
        city: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.CITY)),
        state: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.STATE)),
        zip_code: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.ZIP_CODE)),
        business_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.BUSINESS_NAME)),
        business_address: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.BUSINESS_ADDRESS)),
        work_start_time: Joi.string().empty(""),
        work_end_time: Joi.string().empty(""),
        business_phone: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.BUSINESS_PHONE)),
      },
      parent2: {
        parent_type: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.PARENT_TYPE)),
        first_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
        last_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.LAST_NAME)),
        phone1: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.PHONE1)),
        phone2: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.PHONE2)),
        email1: Joi.string()
          .email()
          .required()
          .error(new Error(JOI_MSG.PARENT1.EMAIL1)),
        address: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.ADDRESS)),
        city: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.CITY)),
        state: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.STATE)),
        zip_code: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.ZIP_CODE)),
        business_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.BUSINESS_NAME)),
        business_address: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.BUSINESS_ADDRESS)),
        work_start_time: Joi.string().empty(""),
        work_end_time: Joi.string().empty(""),
        business_phone: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.BUSINESS_PHONE)),
      },
      emergencyContact1: {
        type: Joi.string()
          .required()
          .error(new Error(JOI_MSG.EMERGENCY_CONTACT1.TYPE)),
        first_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
        last_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
        phone1: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.PHONE1)),
        phone2: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.PHONE2)),
        email1: Joi.string()
          .email()
          .required()
          .error(new Error(JOI_MSG.PARENT1.EMAIL1)),
        address: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.ADDRESS)),
        city: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.CITY)),
        state: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.CITY)),
        zip_code: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.ZIP_CODE)),
        relationship: Joi.string()
          .required()
          .error(new Error(JOI_MSG.EMERGENCY_CONTACT1.RELATIONSHIP)),
        has_emergency_release: Joi.boolean().allow(""),
      },
      emergencyContact2: {
        type: Joi.string()
          .required()
          .error(new Error(JOI_MSG.EMERGENCY_CONTACT1.TYPE)),
        first_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
        last_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
        phone1: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.PHONE1)),
        phone2: Joi.string()
          .required()
          .error(new Error(JOI_MSG.PARENT1.PHONE2)),
        email1: Joi.string()
          .email()
          .required()
          .error(new Error(JOI_MSG.PARENT1.EMAIL1)),
        address: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.ADDRESS)),
        city: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.CITY)),
        state: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.CITY)),
        zip_code: Joi.string()
          .required()
          .error(new Error(JOI_MSG.CHILD_INFO.ZIP_CODE)),
        relationship: Joi.string()
          .required()
          .error(new Error(JOI_MSG.EMERGENCY_CONTACT1.RELATIONSHIP)),
        has_emergency_release: Joi.boolean().allow(""),
      },
      medicalInformation: {
        doctor_name: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.DOCTOR_NAME)),
        doctor_phone: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.DOCTOR_PHONE)),
        doctor_email: Joi.string().email().empty(""),
        doctor_primary_language: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.DOCTOR_PRIMARY_LANGUAGE)),
        doctor_insurance_carrier: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.DOCTOR_INSURANCE_CARRIER)),
        doctor_insurance_number: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.DOCTOR_INSURANCE_NUMBER)),
        last_physical_date: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.LAST_PHYSICAL_DATE)),
        lead_screen_date: Joi.string().empty(""),
        immunizations: Joi.string().empty(""),
        allergies: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.ALLERGIES)),




        has_allergy: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.HAS_ALLERGY)),
        date_of_doctor_letter: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.DATE_OF_DOCTOR_LETTER)),
        medicine_expiration_date: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.MEDICINE_EXPIRATION_DATE)),




        eye_color: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.EYE_COLOR)),
        hair_color: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.HAIR_COLOR)),
        gender: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.GENDER)),
        height: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.HEIGHT)),
        weight: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.WEIGHT)),
        race: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.RACE)),
        identity_marks: Joi.string()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.IDENTITY_MARKS)),
        add_child_to_directory: Joi.boolean()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.ADD_CHILD_TO_DIRECTORY)),
        add_parent_to_directory: Joi.boolean()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.ADD_PARENT_TO_DIRECTORY)),
        add_parent2_to_directory: Joi.boolean()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.ADD_PARENT2_TO_DIRECTORY)),
        has_signature_checked: Joi.boolean()
          .required()
          .error(new Error(JOI_MSG.MEDICAL_INFO.HAS_SIGNATURE_CHECKED)),
        physical_reports: Joi.string().allow(""),
      },
      devReport: {
        age_began_sitting: Joi.string().empty(""),
        crawling: Joi.string().empty(""),
        walking: Joi.string().empty(""),
        talking: Joi.string().empty(""),
        has_child_pull_up: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_child_crawling: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_child_walk_with_support: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_speech_difficulties: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        special_words_to_describe: Joi.string().allow(""),
        language_spoken_at_home: Joi.string().empty(""),
        has_history_of_colics: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_child_use_pacifier_or_sucks_thumbs: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        when_child_use_pacifier_or_sucks_thumbs: Joi.string().allow(""),
        has_child_have_fussy_time: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        when_child_have_fussy_time: Joi.string().allow(""),
        how_parent_handle_time: Joi.string().allow(""),
      },
      childHealth: {
        has_complication_at_birth: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        serious_illness_hospitalization: Joi.string().required(),
        special_physical_condition: Joi.string().required(),
        allergies: Joi.string().required(),
        regular_medications: Joi.string().required(),
      },
      childEatingHabit: {
        special_charecters_or_diffculties: Joi.string().required(),
        special_formula_prepration_details: Joi.string().required(),
        favouraite_food: Joi.string().required(),
        food_refused: Joi.string().required(),
        child_fedon_lap: Joi.string().required(),
        high_chair: Joi.string().required(),
        has_child_use_spoon: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_child_use_fork: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_child_use_hand: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
      },
      childToiletHabit: {
        has_diaper_used: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_diaper_rash_occur: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_parent_use_oil: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_parent_powder: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_parent_lotion: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_parent_use_other: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_bowel_movement_regular: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        how_many_time_bowl_move: Joi.string().required(),
        has_problem_of_diarrhea: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_problem_of_constipation: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_toilet_training: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        particular_procedure_of_child: Joi.string().required(),
        has_child_use_potty_chair: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_child_use_special_seat: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_child_use_regular_seat: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        how_child_indicate_bathroom: Joi.string().required(),
        has_childwilling_to_use_bathroom: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_child_have_accident: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
      },
      childSleepingHabit: {
        has_child_sleep_on_crib: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_child_sleep_on_bed: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        how_does_child_becometired: Joi.string().required(),
        has_child_sleep_at_night: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_child_get_up_in_morning: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        special_charecterstic_or_need: Joi.string().required(),
      },
      socialRelationship: {
        child_description_by_parent: Joi.string().required(),
        previous_experience: Joi.string().required(),
        reaction_to_starnger: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        favouraite_toy: Joi.string().required(),
        child_fear: Joi.string().required(),
        how_parent_comfort_child: Joi.string().required(),
        behaviour_management: Joi.string().required(),
        how_child_gain_experience: Joi.string().required(),
        has_allow_play_alone: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
      },
      dailySchedule: {
        more_about_child: Joi.string().required(),
      },
      photoRelease: {
        has_photo_permission_granted: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        comment: Joi.string().required().error(new Error()),
        signature: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.SIGNATURE)),
      },
      localTripPermission: {
        has_parent_agreed_for_trip: Joi.boolean().required(),
      },
      parentAgreement: {
        has_parent_agreed_with_policies: Joi.boolean().required(),
      },
      authorizationAndConsent: {
        has_authorize_mychild: Joi.boolean().required(),
        has_authorize_and_consent_agreement: Joi.boolean().required(),
      },
      sunscreenPermission: {
        has_sunscreen_provided_by_school: Joi.boolean().required(),
        has_child_bring_sunscreen: Joi.boolean().required(),
        comment: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.COMMENT)),
        signature: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.SIGNATURE)),
      },
      toothBrushingInformation: {
        has_participate_in_toothbrushing: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        has_fluoride: Joi.boolean().required(),
        has_school_toothbrushing: Joi.string()
          .optional()
          .allow(null)
          .allow("")
          .empty("")
          .default("no"),
        comment: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.COMMENT)),
        signature: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.SIGNATURE)),
      },
      transportAuthority: {
        has_parent_drop_off: Joi.boolean().required(),
        has_parent_pick_up: Joi.boolean().required(),
        has_supervised_walk: Joi.boolean().required(),
        has_public_private_van: Joi.boolean().required(),
        has_program_bus_van: Joi.boolean().required(),
        has_contract_van: Joi.boolean().required(),
        has_private_transport_arranged_by_parent: Joi.boolean().required(),
        has_other: Joi.boolean().required(),
        comment: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.COMMENT)),
        signature: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.SIGNATURE)),
      },
      schoolDirectory: {
        has_parent_information_publish: Joi.boolean().required(),
        has_parent_wish_to_add_school_directory: Joi.boolean().required(),
        comment: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.COMMENT)),
        signature: Joi.string()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.SIGNATURE)),
      },
    }),
    addTeacherSchema: Joi.object().keys({
      first_name: Joi.string()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
      last_name: Joi.string()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.LAST_NAME)),
      email: Joi.string()
        .email()
        .required()
        .error(new Error(JOI_MSG.USER_INFO.EMAIL)),
    }),
    teacherInfoSchema: Joi.object().keys({
      user_info: {
        first_name: Joi.string().allow(""),
        last_name: Joi.string().allow(""),
        email: Joi.string()
          .email()
          .required()
          .error(new Error(JOI_MSG.USER_INFO.EMAIL)),
      },
      teacher_info: {},
    }),
    addClassSchema: Joi.object().keys({
      id: Joi.string().allow(""),
      class_name: Joi.string()
        .required()
        .error(new Error(JOI_MSG.CLASS.CLASS_NAME)),
      class_age: Joi.string()
        .required()
        .error(new Error(JOI_MSG.CLASS.CLASS_AGE)),
      room: Joi.string().required().error(new Error(JOI_MSG.CLASS.ROOM)),
      location: Joi.string()
        .required()
        .error(new Error(JOI_MSG.CLASS.LOCATION)),
      teachers: Joi.array().required().error(new Error(JOI_MSG.CLASS.TEACHERS)),
      children: Joi.array().required().error(new Error(JOI_MSG.CLASS.CHILDREN)),
    }),
    updateClassSchema: Joi.object().keys({
      id: Joi.number().required().error(new Error(JOI_MSG.CLASS.CLASS_ID)),
      class_name: Joi.string()
        .required()
        .error(new Error(JOI_MSG.CLASS.CLASS_NAME)),
      class_age: Joi.string()
        .required()
        .error(new Error(JOI_MSG.CLASS.CLASS_AGE)),
      room: Joi.string().required().error(new Error(JOI_MSG.CLASS.ROOM)),
      location: Joi.string()
        .required()
        .error(new Error(JOI_MSG.CLASS.LOCATION)),
      teachers: Joi.array().required().error(new Error(JOI_MSG.CLASS.TEACHERS)),
      children: Joi.array().required().error(new Error(JOI_MSG.CLASS.CHILDREN)),
    }),
    addAnnouncementSchema: Joi.object().keys({
      title: Joi.string()
        .required()
        .error(new Error(JOI_MSG.ANNOUNCEMENTS.TITLE)),
      description: Joi.string()
        .required()
        .error(new Error(JOI_MSG.ANNOUNCEMENTS.DESCRIPTION)),
    }),
    updateAnnouncementSchema: Joi.object().keys({
      id: Joi.number()
        .required()
        .error(new Error(JOI_MSG.ANNOUNCEMENTS.ANNOUNCEMENTS_ID)),
      title: Joi.string()
        .required()
        .error(new Error(JOI_MSG.ANNOUNCEMENTS.TITLE)),
      description: Joi.string()
        .required()
        .error(new Error(JOI_MSG.ANNOUNCEMENTS.DESCRIPTION)),
    }),
    addIncidentSchema: Joi.object().keys({
      id: Joi.string().allow(""),
      name: Joi.string()
        .required()
        .error(new Error(JOI_MSG.INCIDENTS.NAME)),
      location: Joi.string()
        .required()
        .error(new Error(JOI_MSG.INCIDENTS.LOCATION)),
      class_id: Joi.number().required().error(new Error(JOI_MSG.INCIDENTS.CLASS_ID)),
      user_id: Joi.number()
        .required()
        .error(new Error(JOI_MSG.INCIDENTS.USER_ID)),
      date: Joi.date().required().error(new Error(JOI_MSG.INCIDENTS.DATE)),
      medias: Joi.array().allow([]),
      incident_type: Joi.string().allow(""),
      description: Joi.string().allow(""),
      solution: Joi.string().allow(""),
      status: Joi.string().allow(""),
      parent_notified: Joi.boolean().allow(""),
      teacher_signoff: Joi.boolean().allow(""),
      director_signoff: Joi.boolean().allow(""),
    }),


    addLocationSchema: Joi.object().keys({
      id: Joi.number().required().error(new Error("id is require")),
      location: Joi.string()
        .required()
        .error(new Error("location is require")),
      status: Joi.string().allow("status is require"),
      has_deleted: Joi.boolean().allow("has delete is require"),
    }),

    addIncidentTypeSchema: Joi.object().keys({
      id: Joi.number().required().error(new Error("id is require")),
      incident_type: Joi.string().required().error(new Error("Incident type is require")),
      status: Joi.string().allow("status is require"),
      has_deleted: Joi.boolean().allow("has delete is require"),
    }),


    updateIncidentSchema: Joi.object().keys({
      id: Joi.number().required().error(new Error(JOI_MSG.INCIDENTS.INCIDENT_ID)),
      name: Joi.string()
        .required()
        .error(new Error(JOI_MSG.INCIDENTS.NAME)),
      location: Joi.string()
        .required()
        .error(new Error(JOI_MSG.INCIDENTS.LOCATION)),
      class_id: Joi.number().required().error(new Error(JOI_MSG.INCIDENTS.CLASS_ID)),
      user_id: Joi.number()
        .required()
        .error(new Error(JOI_MSG.INCIDENTS.USER_ID)),
      date: Joi.date().required().error(new Error(JOI_MSG.INCIDENTS.DATE)),
      medias: Joi.array().allow([]),
      incident_type: Joi.string().allow(""),
      description: Joi.string().allow(""),
      solution: Joi.string().allow(""),
      status: Joi.string().allow(""),
      parent_notified: Joi.boolean().allow(""),
      teacher_signoff: Joi.boolean().allow(""),
      director_signoff: Joi.boolean().allow(""),
    }),
  },
};










































































































































































































// const Joi = require('joi');
// const JOI_MSG = require('./joiValidation');
// module.exports = {
//     validateBody: (schema) =>{
//         console.log(schema)
//         return (req,res,next) =>{
//             const result = Joi.validate(req.body ,schema);
//             if(result.error){
//               throw result.error;
//                 // return res.status(400).json({data:result.error})
//             }
//             if(!req.value) {req.value = {};}
//             req.value['body'] = result.value;
//             next();
//         }
//     },

//     schemas:{
//         signUpSchema: Joi.object().keys({
//             first_name:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
//             last_name:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.LAST_NAME)),
//             email:Joi.string().email().required().error(new Error(JOI_MSG.USER_INFO.EMAIL)),
//             password:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.PASSWORD)),
//             phone:Joi.number().required().error(new Error(JOI_MSG.USER_INFO.PHONE)),
//             cellphone:Joi.number().required().error(new Error(JOI_MSG.USER_INFO.CELLPHONE)),
//             role_id:Joi.number().required().error(new Error(JOI_MSG.USER_INFO.ROLE_ID)),
//             signature:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.SIGNATURE)),
//             comment:Joi.string().allow('')
//         }),
//         signInSchema: Joi.object().keys({
//             email:Joi.string().email().required().error(new Error(JOI_MSG.USER_INFO.EMAIL)),
//             password:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.PASSWORD))
//         }),
//         forgotPasswordSchema:Joi.object().keys({
//           email: Joi.string().email().required().error(new Error(JOI_MSG.USER_INFO.EMAIL))
//         }),
//         resetPasswordSchema:Joi.object().keys({
//           new_password:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.NEW_PASSWORD)),
//           signature:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.SIGNATURE))
//         }),
//         supportSchema: Joi.object().keys({
//             // name:Joi.string(),
//             // email:Joi.string().email(),
//             // phone:Joi.string(),
//             subject:Joi.string().required().error(new Error(JOI_MSG.SUPPORT.SUBJECT)),
//             message:Joi.string().required().error(new Error(JOI_MSG.SUPPORT.MESSAGE)),
//         }),
//         addChildSchema:Joi.object().keys({
//             childInfo:{
//                 first_name: Joi.string().required().error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
//                 last_name: Joi.string().required().error(new Error(JOI_MSG.USER_INFO.LAST_NAME)),
//                 birth_date: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
//                 birth_place: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
//                 admission_date: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
//                 address: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
//                 city: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
//                 state: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
//                 zip_code: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.MESSAGE)),
//                 class_id: Joi.number().default(1),
//             },
//             parent1: {
//                 parent_type: Joi.string().required().error(new Error(JOI_MSG.PARENT1.PARENT_TYPE)),
//                 first_name: Joi.string().required().error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
//                 last_name: Joi.string().required().error(new Error(JOI_MSG.USER_INFO.LAST_NAME)),
//                 phone1: Joi.string().required().error(new Error(JOI_MSG.PARENT1.PHONE1)),
//                 phone2: Joi.string().required().error(new Error(JOI_MSG.PARENT1.PHONE2)),
//                 email1: Joi.string().email().required().error(new Error(JOI_MSG.PARENT1.EMAIL1)),
//                 address: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.ADDRESS)),
//                 city: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.CITY)),
//                 state: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.STATE)),
//                 zip_code: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.ZIP_CODE)),
//                 business_name: Joi.string().required().error(new Error(JOI_MSG.PARENT1.BUSINESS_NAME)),
//                 business_address: Joi.string().required().error(new Error(JOI_MSG.PARENT1.BUSINESS_ADDRESS)),
//                 work_start_time: Joi.string().empty(''),
//                 work_end_time:Joi.string().empty(''),
//                 business_phone: Joi.string().required().error(new Error(JOI_MSG.PARENT1.BUSINESS_PHONE))
//               },
//               parent2: {
//                 parent_type: Joi.string().required().error(new Error(JOI_MSG.PARENT1.PARENT_TYPE)),
//                 first_name: Joi.string().required().error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
//                 last_name: Joi.string().required().error(new Error(JOI_MSG.USER_INFO.LAST_NAME)),
//                 phone1: Joi.string().required().error(new Error(JOI_MSG.PARENT1.PHONE1)),
//                 phone2: Joi.string().required().error(new Error(JOI_MSG.PARENT1.PHONE2)),
//                 email1: Joi.string().email().required().error(new Error(JOI_MSG.PARENT1.EMAIL1)),
//                 address: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.ADDRESS)),
//                 city: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.CITY)),
//                 state: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.STATE)),
//                 zip_code: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.ZIP_CODE)),
//                 business_name: Joi.string().required().error(new Error(JOI_MSG.PARENT1.BUSINESS_NAME)),
//                 business_address: Joi.string().required().error(new Error(JOI_MSG.PARENT1.BUSINESS_ADDRESS)),
//                 work_start_time: Joi.string().empty(''),
//                 work_end_time:Joi.string().empty(''),
//                 business_phone: Joi.string().required().error(new Error(JOI_MSG.PARENT1.BUSINESS_PHONE))
//               },
//               emergencyContact1: {
//                 type: Joi.string().required().error(new Error(JOI_MSG.EMERGENCY_CONTACT1.TYPE)),
//                 first_name: Joi.string().required().error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
//                 last_name: Joi.string().required().error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
//                 phone1: Joi.string().required().error(new Error(JOI_MSG.PARENT1.PHONE1)),
//                 phone2: Joi.string().required().error(new Error(JOI_MSG.PARENT1.PHONE2)),
//                 email1: Joi.string().email().required().error(new Error(JOI_MSG.PARENT1.EMAIL1)),
//                 address: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.ADDRESS)),
//                 city: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.CITY)),
//                 state: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.CITY)),
//                 zip_code: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.ZIP_CODE)),
//                 relationship: Joi.string().required().error(new Error(JOI_MSG.EMERGENCY_CONTACT1.RELATIONSHIP)),
//                 has_emergency_release: Joi.boolean().allow('')
//               },
//               emergencyContact2: {
//                 type: Joi.string().required().error(new Error(JOI_MSG.EMERGENCY_CONTACT1.TYPE)),
//                 first_name: Joi.string().required().error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
//                 last_name: Joi.string().required().error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
//                 phone1: Joi.string().required().error(new Error(JOI_MSG.PARENT1.PHONE1)),
//                 phone2: Joi.string().required().error(new Error(JOI_MSG.PARENT1.PHONE2)),
//                 email1: Joi.string().email().required().error(new Error(JOI_MSG.PARENT1.EMAIL1)),
//                 address: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.ADDRESS)),
//                 city: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.CITY)),
//                 state: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.CITY)),
//                 zip_code: Joi.string().required().error(new Error(JOI_MSG.CHILD_INFO.ZIP_CODE)),
//                 relationship: Joi.string().required().error(new Error(JOI_MSG.EMERGENCY_CONTACT1.RELATIONSHIP)),
//                 has_emergency_release: Joi.boolean().allow('')
//               },
//               medicalInformation: {
//                 doctor_name: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.DOCTOR_NAME)),
//                 doctor_phone: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.DOCTOR_PHONE)),
//                 doctor_email: Joi.string().email().empty(''),
//                 doctor_primary_language: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.DOCTOR_PRIMARY_LANGUAGE)),
//                 doctor_insurance_carrier: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.DOCTOR_INSURANCE_CARRIER)),
//                 doctor_insurance_number: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.DOCTOR_INSURANCE_NUMBER)),
//                 last_physical_date: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.LAST_PHYSICAL_DATE)),
//                 lead_screen_date: Joi.string().empty(''),
//                 immunizations: Joi.string().empty(''),
//                 allergies: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.ALLERGIES)),
//                 eye_color: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.EYE_COLOR)),
//                 hair_color: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.HAIR_COLOR)),
//                 gender: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.GENDER)),
//                 height: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.HEIGHT)),
//                 weight: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.WEIGHT)),
//                 race: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.RACE)),
//                 identity_marks: Joi.string().required().error(new Error(JOI_MSG.MEDICAL_INFO.IDENTITY_MARKS)),
//                 add_child_to_directory: Joi.boolean().required().error(new Error(JOI_MSG.MEDICAL_INFO.ADD_CHILD_TO_DIRECTORY)),
//                 add_parent_to_directory: Joi.boolean().required().error(new Error(JOI_MSG.MEDICAL_INFO.ADD_PARENT_TO_DIRECTORY)),
//                 add_parent2_to_directory: Joi.boolean().required().error(new Error(JOI_MSG.MEDICAL_INFO.ADD_PARENT2_TO_DIRECTORY)),
//                 has_signature_checked: Joi.boolean().required().error(new Error(JOI_MSG.MEDICAL_INFO.HAS_SIGNATURE_CHECKED)),
//                 physical_reports:Joi.string().allow('')
//               },
//               devReport:{
//                 age_began_sitting:Joi.string().empty(''),
//                 crawling:Joi.string().empty(''),
//                 walking:Joi.string().empty(''),
//                 talking:Joi.string().empty(''),
//                 has_child_pull_up:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_child_crawling:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_child_walk_with_support:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_speech_difficulties:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 special_words_to_describe:Joi.string().allow(''),
//                 language_spoken_at_home:Joi.string().empty(''),
//                 has_history_of_colics:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_child_use_pacifier_or_sucks_thumbs:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 when_child_use_pacifier_or_sucks_thumbs:Joi.string().allow(''),
//                 has_child_have_fussy_time:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 when_child_have_fussy_time:Joi.string().allow(''),
//                 how_parent_handle_time:Joi.string().allow('')
//               },
//               childHealth:{
//                 has_complication_at_birth:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 serious_illness_hospitalization:Joi.string().required(),
//                 special_physical_condition:Joi.string().required(),
//                 allergies:Joi.string().required(),
//                 regular_medications:Joi.string().required()
//               },
//               childEatingHabit:{
//                 special_charecters_or_diffculties: Joi.string().required(),
//                 special_formula_prepration_details: Joi.string().required(),
//                 favouraite_food: Joi.string().required(),
//                 food_refused: Joi.string().required(),
//                 child_fedon_lap: Joi.string().required(),
//                 high_chair: Joi.string().required(),
//                 has_child_use_spoon: Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_child_use_fork: Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_child_use_hand: Joi.string().optional().allow(null).allow('').empty('').default('no'),
//               },
//               childToiletHabit:{
//                 has_diaper_used:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_diaper_rash_occur:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_parent_use_oil:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_parent_powder:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_parent_lotion:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_parent_use_other:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_bowel_movement_regular:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 how_many_time_bowl_move:Joi.string().required(),
//                 has_problem_of_diarrhea:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_problem_of_constipation:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_toilet_training:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 particular_procedure_of_child:Joi.string().required(),
//                 has_child_use_potty_chair:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_child_use_special_seat:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_child_use_regular_seat:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 how_child_indicate_bathroom:Joi.string().required(),
//                 has_childwilling_to_use_bathroom:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_child_have_accident:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//               },
//               childSleepingHabit:{
//                 has_child_sleep_on_crib: Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_child_sleep_on_bed: Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 how_does_child_becometired: Joi.string().required(),
//                 has_child_sleep_at_night: Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_child_get_up_in_morning: Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 special_charecterstic_or_need: Joi.string().required()
//               },
//               socialRelationship:{
//                 child_description_by_parent:Joi.string().required(),
//                 previous_experience:Joi.string().required(),
//                 reaction_to_starnger:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 favouraite_toy:Joi.string().required(),
//                 child_fear:Joi.string().required(),
//                 how_parent_comfort_child:Joi.string().required(),
//                 behaviour_management:Joi.string().required(),
//                 how_child_gain_experience:Joi.string().required(),
//                 has_allow_play_alone:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//               },
//               dailySchedule:{
//                 more_about_child:Joi.string().required()
//               },
//               photoRelease:{
//                 has_photo_permission_granted: Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 comment:Joi.string().required().error(new Error()),
//                 signature:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.SIGNATURE))
//               },
//               localTripPermission:{
//                 has_parent_agreed_for_trip:Joi.boolean().required()
//               },
//               parentAgreement:{
//                 has_parent_agreed_with_policies:Joi.boolean().required()
//               },
//               authorizationAndConsent:{
//                 has_authorize_mychild:Joi.boolean().required(),
//                 has_authorize_and_consent_agreement:Joi.boolean().required()
//               },
//               sunscreenPermission:{
//                 has_sunscreen_provided_by_school:Joi.boolean().required(),
//                 has_child_bring_sunscreen:Joi.boolean().required(),
//                 comment:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.COMMENT)),
//                 signature:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.SIGNATURE))
//               },
//               toothBrushingInformation:{
//                 has_participate_in_toothbrushing:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 has_fluoride:Joi.boolean().required(),
//                 has_school_toothbrushing:Joi.string().optional().allow(null).allow('').empty('').default('no'),
//                 comment:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.COMMENT)),
//                 signature:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.SIGNATURE))
//               },
//               transportAuthority:{
//                 has_parent_drop_off:Joi.boolean().required(),
//                 has_parent_pick_up:Joi.boolean().required(),
//                 has_supervised_walk:Joi.boolean().required(),
//                 has_public_private_van:Joi.boolean().required(),
//                 has_program_bus_van:Joi.boolean().required(),
//                 has_contract_van:Joi.boolean().required(),
//                 has_private_transport_arranged_by_parent:Joi.boolean().required(),
//                 has_other:Joi.boolean().required(),
//                 comment:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.COMMENT)),
//                 signature:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.SIGNATURE))
//               },
//               schoolDirectory:{
//                 has_parent_information_publish:Joi.boolean().required(),
//                 has_parent_wish_to_add_school_directory:Joi.boolean().required(),
//                 comment:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.COMMENT)),
//                 signature:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.SIGNATURE))
//               }
//         }),
//         addTeacherSchema:Joi.object().keys({
//           first_name:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.FIRST_NAME)),
//           last_name:Joi.string().required().error(new Error(JOI_MSG.USER_INFO.LAST_NAME)),
//           email:Joi.string().email().required().error(new Error(JOI_MSG.USER_INFO.EMAIL)),
//         }),
//         teacherInfoSchema:Joi.object().keys({
//           user_info:{
//             first_name: Joi.string().allow(''),
//             last_name: Joi.string().allow(''),
//             email:Joi.string().email().required().error(new Error(JOI_MSG.USER_INFO.EMAIL))
//           },
//           teacher_info:{

//           }
//         }),
//         addClassSchema:Joi.object().keys({
//           id:Joi.string().allow(''),
//           class_name: Joi.string().required().error(new Error(JOI_MSG.CLASS.CLASS_NAME)),
//           class_age: Joi.string().required().error(new Error(JOI_MSG.CLASS.CLASS_AGE)),
//           room: Joi.string().required().error(new Error(JOI_MSG.CLASS.ROOM)),
//           location: Joi.string().required().error(new Error(JOI_MSG.CLASS.LOCATION)),
//           teachers:Joi.array().required().error(new Error(JOI_MSG.CLASS.TEACHERS)),
// 		  children: Joi.array().required().error(new Error(JOI_MSG.CLASS.CHILDREN))
//         }),
//         updateClassSchema:Joi.object().keys({
//           id:Joi.number().required().error(new Error(JOI_MSG.CLASS.CLASS_ID)),
//           class_name: Joi.string().required().error(new Error(JOI_MSG.CLASS.CLASS_NAME)),
//           class_age: Joi.string().required().error(new Error(JOI_MSG.CLASS.CLASS_AGE)),
//           room: Joi.string().required().error(new Error(JOI_MSG.CLASS.ROOM)),
//           location: Joi.string().required().error(new Error(JOI_MSG.CLASS.LOCATION)),
//           teachers:Joi.array().required().error(new Error(JOI_MSG.CLASS.TEACHERS)),
// 		  children: Joi.array().required().error(new Error(JOI_MSG.CLASS.CHILDREN))
//         }),
//         addAnnouncementSchema:Joi.object().keys({
//           title:Joi.string().required().error(new Error(JOI_MSG.ANNOUNCEMENTS.TITLE)),
//           description:Joi.string().required().error(new Error(JOI_MSG.ANNOUNCEMENTS.DESCRIPTION))
//         }),
//         updateAnnouncementSchema:Joi.object().keys({
//           id:Joi.number().required().error(new Error(JOI_MSG.ANNOUNCEMENTS.ANNOUNCEMENTS_ID)),
//           title:Joi.string().required().error(new Error(JOI_MSG.ANNOUNCEMENTS.TITLE)),
//           description:Joi.string().required().error(new Error(JOI_MSG.ANNOUNCEMENTS.DESCRIPTION))
//         }),
// 		addIncidentSchema: Joi.object().keys({
// 			id: Joi.string().allow(""),
// 			  name: Joi.string()
// 				.required()
// 				.error(new Error(JOI_MSG.INCIDENTS.NAME)),
// 			  location: Joi.string()
// 				.required()
// 				.error(new Error(JOI_MSG.INCIDENTS.LOCATION)),
// 			  class_id: Joi.number().required().error(new Error(JOI_MSG.INCIDENTS.CLASS_ID)),
// 			  user_id: Joi.number()
// 				.required()
// 				.error(new Error(JOI_MSG.INCIDENTS.USER_ID)),
// 			  date: Joi.date().required().error(new Error(JOI_MSG.INCIDENTS.DATE)),
// 			  medias: Joi.array().allow([]),
// 			  incident_type: Joi.string().allow(""),
// 			  description: Joi.string().allow(""),
// 			  solution: Joi.string().allow(""),
// 			  status: Joi.string().allow(""),
// 			  parent_notified: Joi.boolean().allow(""),
// 			  teacher_signoff: Joi.boolean().allow(""),
// 			  director_signoff: Joi.boolean().allow(""),
// 		}),
// 		updateIncidentSchema: Joi.object().keys({
// 			  id: Joi.number().required().error(new Error(JOI_MSG.INCIDENTS.INCIDENT_ID)),
// 			  name: Joi.string()
// 				.required()
// 				.error(new Error(JOI_MSG.INCIDENTS.NAME)),
// 			  location: Joi.string()
// 				.required()
// 				.error(new Error(JOI_MSG.INCIDENTS.LOCATION)),
// 			  class_id: Joi.number().required().error(new Error(JOI_MSG.INCIDENTS.CLASS_ID)),
// 			  user_id: Joi.number()
// 				.required()
// 				.error(new Error(JOI_MSG.INCIDENTS.USER_ID)),
// 			  date: Joi.date().required().error(new Error(JOI_MSG.INCIDENTS.DATE)),
// 			  medias: Joi.array().allow([]),
// 			  incident_type: Joi.string().allow(""),
// 			  description: Joi.string().allow(""),
// 			  solution: Joi.string().allow(""),
// 			  status: Joi.string().allow(""),
// 			  parent_notified: Joi.boolean().allow(""),
// 			  teacher_signoff: Joi.boolean().allow(""),
// 			  director_signoff: Joi.boolean().allow(""),
//    	 	}),
        
//     }
// }